
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import cron from "node-cron";
import Application from './routes/Applications.js'
import User from './Models/UserSchema.js';
import authRoute from './routes/auth.js';
import fetchEmails from './imapService.js'
import stats from './routes/Stats.js'

dotenv.config();

const app =express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors(
        {
            origin: `${process.env.CLIENT_URL}`,
            methods : "GET,POST,PUT,DELETE",
            credentials : true,
        }
    )
);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));



  
  app.use(
      session({
          secret: process.env.CLIENT_SECRET || "your_secret",
          resave: false,
          saveUninitialized: false,
          store: MongoStore.create({
              mongoUrl: process.env.MONGO_URL,
              collectionName: "sessions",
          }),
          cookie: {
              maxAge: 24 * 60 * 60 * 1000, // 1 day
              secure: false, // Change to true if using HTTPS
          },
      })
  );
  



app.use("/auth", authRoute);
app.use("/",Application)
app.use("/",stats)

// ✅ Function to Fetch Emails for All Users
async function fetchEmailsForAllUsers() {
    console.log("⏳ Fetching emails for all registered users...");

    try {
        const users = await User.find({}); // Fetch all users from the database

        for (const user of users) {
            if (user.email && user.accessToken) {
                console.log(`📩 Fetching emails for ${user.email}...`);
                await fetchEmails(user.email, user.accessToken); // Fetch and store in user's database entry
            } else {
                console.warn(`⚠️ Skipping ${user.email} - No Access Token`);
            }
        }

        console.log("✅ Email fetching process completed.");
    } catch (error) {
        console.error("❌ Error fetching emails for users:", error);
    }
}

cron.schedule("*/1 * * * *", () => {
    console.log("Fetching emails at:", new Date().toLocaleTimeString());
    fetchEmailsForAllUsers(); // Your function here
});
app.listen(3000, () => { 
    console.log("server started");
});




// ?https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=1//0g7nVgNeSrCbfCgYIARAAGBASNwF-L9IrUOTRYuisGZsNJOnUicB941ZEHzjUsPvVD_m-lI4bEoavf3RbZsJXSClsUV945fu9XwI