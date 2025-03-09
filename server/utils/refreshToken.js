import axios from "axios";

async function refreshAccessToken(user) {
    try {
      console.log("🔄 Attempting to refresh token...");
  
      const response = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          refresh_token: user.refreshToken,
          grant_type: "refresh_token",
        }
      );
  
      console.log("✅ New Access Token:", response.data.access_token);
      console.log("🔄 New Refresh Token (if any):", response.data.refresh_token || "No new refresh token provided");
  
      user.accessToken = response.data.access_token;
      if (response.data.refresh_token) {
        user.refreshToken = response.data.refresh_token; // Update refresh token if new one is issued
      }
      await user.save();
  
      return response.data.access_token;
    } catch (error) {
      console.error("❌ Refresh Token Failed:", error.response?.data || error.message);
      return null;
    }
  }
  export default refreshAccessToken