import express from "express";
import mongoose from "mongoose";
import User from "../Models/UserSchema.js"; // Main User schema

const router = express.Router();

// Route to update user stats
router.get("/api/stats", async (req, res) => {
  try {
    const { email } = req.query; 
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userStats = user.dailyStats;

    console.log(userStats)

    


    // Send stats data in the response
    res.status(200).json({
      success: true,
      message: "Stats updated successfully",
      stats: userStats, 
    });
  } catch (err) {
    console.error("Error updating application stats:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
