import axios from 'axios'
import dotenv from "dotenv";

dotenv.config();

async function checkRefreshToken(refreshToken, clientId, clientSecret) {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        }));

        console.log("✅ Refresh Token is valid!");
        console.log("New Access Token:", response.data.access_token);
    } catch (error) {
        console.log("❌ Invalid Refresh Token:", error.response.data);
    }
}

// Replace with your actual credentials
const CLIENT_ID = "391170977836-i26pverbsic16dcofi9s07tdpg4d1hsv.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//0gih4-GmmsVS9CgYIARAAGBASNwF-L9IrdoC57nJiJuQkaIMXjRBOtgQOpSTmReEy-e-9Xj5uoP-1Kc0vDH_lvsRLYOSrUGvs7v4";

checkRefreshToken(REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET);
