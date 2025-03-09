import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import mongoose from "mongoose";
import * as cheerio from "cheerio";
import xoauth2 from "xoauth2";
import User from "./Models/UserSchema.js";
import axios from "axios";
import refreshAccessToken from "./utils/refreshToken.js"; // Import refresh token function

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function checkAccessTokenValidity(accessToken) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    return response.status === 200; // Token is valid
  } catch (error) {
    return false; // Token is invalid or expired
  }
}

async function getXOAUTH2Token(email, accessToken) {
  return new Promise((resolve, reject) => {
    const xoauth2gen = xoauth2.createXOAuth2Generator({
      user: email,
      accessToken: accessToken,
    });

    xoauth2gen.getToken((err, token) => {
      if (err) {
        console.error("❌ Error generating XOAUTH2 token:", err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

async function extractEmailData(subject, body) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
Extract the following details from the given email subject and body:
- **Company Name** (Always extract this correctly, infer from sender email if needed)
- **Job Role**
- **Application Status** (Applied, Rejected, Interview Scheduled, etc.)
- **Date of Email (if available)**

📩 **Subject**: ${subject}
📝 **Body**: ${body}

Ensure that "company" is never null. If no company name is explicitly mentioned, infer it from the sender's email address or domain.

Return ONLY JSON output:
{
  "company": "Company Name",
  "role": "Job Role",
  "status": "Application Status",
  "date": "Date if available"
}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{.*\}/s);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}

async function fetchEmails(email, accessToken) {
  let connection;
  try {
    console.log(email, accessToken);

    if (!accessToken) {
      console.log(`⛔ No access token found for ${email}`);
      return;
    }

    let isTokenValid = await checkAccessTokenValidity(accessToken);

    if (!isTokenValid) {
      console.log(`⚠️ Access Token expired for ${email}, refreshing...`);

      const user = await User.findOne({ email });

      if (!user || !user.refreshToken) {
        console.error(`⛔ No refresh token found for ${email}`);
        return;
      }

      // ✅ Refresh access token using the function from refreshtoken.js
      accessToken = await refreshAccessToken(user);

      if (!accessToken) {
        console.error(`⛔ Could not refresh access token for ${email}`);
        return;
      }
    }

    // ✅ Generate XOAUTH2 token with the valid access token
    const xoauth2Token = await getXOAUTH2Token(email, accessToken);
   
    const config = {
      imap: {
        user: email,
        xoauth2: xoauth2Token,
        host: process.env.IMAP_HOST,
        port: process.env.IMAP_PORT,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 10000,
      },
    };

    connection = await imaps.connect(config);
    await connection.openBox("INBOX");
    const user = await User.findOne({ email });

    // const date = new Date();
    // date.setDate(date.getDate() - 1);

    const lastFetchedTime = User?.lastFetched || new Date(); // Use stored time or current date

    // Convert to "DD-MMM-YYYY" format required by IMAP
    const formattedDate = lastFetchedTime
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-"); // Convert spaces to dashes

    // const yesterday = new Date();
    // yesterday.setDate(yesterday.getDate() - 1);
    // const formattedDate = yesterday.toUTCString();

    const searchCriteria = [["SINCE", formattedDate]];

    const fetchOptions = { bodies: ["HEADER", "TEXT"], struct: true };

    const messages = await connection.search(searchCriteria, fetchOptions);

    let totalApplications = 0;
    let interviews = 0;
    let upcomingTasks = 0;
    let newApplications = [];

    for (const item of messages) {
      const header = item.parts.find((part) => part.which === "HEADER");
      const text = item.parts.find((part) => part.which === "TEXT");
      if (!header || !text) continue;

      const subject = header.body.subject ? header.body.subject[0] : "(No Subject)";

      const parsed = await simpleParser(text.body);
      const plainText = parsed.text ? parsed.text.trim() : "";

      const htmlContent = parsed.html || "";
      const $ = cheerio.load(htmlContent);
      const extractedHtmlText = $("p").text().trim();

      const relevantKeywords = ["application", "interview"];
      if (
        !relevantKeywords.some((keyword) =>
          subject.toLowerCase().includes(keyword)
        )
      ) {
        continue; // Skip irrelevant emails
      }
      

      const hash = `${subject.toLowerCase()}-${extractedHtmlText.toLowerCase()}`;

      if (user?.processedEmails?.includes(hash)) {
        console.log("⚠️ Duplicate email detected. Skipping Gemini API call...");
        continue;
      }

      const extractedData = await extractEmailData(subject, extractedHtmlText);
      if (extractedData) {
        newApplications.push({
          company: extractedData.company,
          role: extractedData.role,
          status: extractedData.status,
          date: extractedData.date || new Date(),
        });

        if (!user.processedEmails) {
          user.processedEmails = [];
      }
      user.processedEmails.push(hash);
      
        totalApplications++;
        if (subject.toLowerCase().includes("interview")) interviews++;
        if (subject.toLowerCase().includes("task") || plainText.includes("task"))
          upcomingTasks++;
      }
      
    if (newApplications.length > 0) {
      await User.updateOne(
        { email },
        { $push: { applications: { $each: newApplications } } }
      );
      console.log(`✅ ${newApplications.length} new applications saved.`);
    }

    await user.save();

    console.log("✅ Data saved to database successfully");

    

    const today = new Date().toISOString().split("T")[0];
    

    if (user) {
      const existingStats = user.dailyStats.find(
        (stat) => stat.date.toISOString().split("T")[0] === today
      );

      if (existingStats) {
        // Update existing record
        existingStats.totalApplications += totalApplications;
        existingStats.interviews += interviews;
        existingStats.upcomingTasks += upcomingTasks;
        existingStats.responseRate = `${
          (existingStats.interviews / (existingStats.totalApplications || 1)) *
          100
        }%`;
      } else {
        // Insert new daily stats entry
        user.dailyStats.push({
          date: new Date(),
          totalApplications,
          interviews,
          upcomingTasks,
          responseRate: `${(interviews / (totalApplications || 1)) * 100}%`,
        });
      }

      await user.save();
      console.log("📊 DailyStats updated successfully");
    }

      
    }

    
    }
   catch (error) {
    console.error("Error fetching emails:", error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default fetchEmails;
