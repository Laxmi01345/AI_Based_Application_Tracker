import mongoose from "mongoose";
import ApplicationSchema from "./JobAppSchema.js";
import DailyStatsSchema from "./DailyStatsSchema.js";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: { 
    type: String, 
    required: false 
  },
  refreshToken:
    { type: String,
       required: false
    },
    lastFetched: { 
    type: Date, 
    default: Date.now 
  },
    
  applications: [ApplicationSchema],
  dailyStats: [DailyStatsSchema],      
});


const User = mongoose.model("User", UserSchema);
export default User;

