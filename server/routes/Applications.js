import express from "express";
import User from "../Models/UserSchema.js"; // Adjust the path as needed

const router = express.Router();

router.get("/api/AppDetails", async (req, res) => {
  try {
    const { email } = req.query; // Get email from query params
    

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, applications: user.applications });
  } catch (err) {
    console.error("Error fetching application details:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
