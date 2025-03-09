import mongoose from "mongoose";
import user from '../Models/UserSchema.js'
const DailyStatsSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true
 },
  totalApplications: { 
    type: Number, 
    default: 0 
},
  interviews: {
     type: Number,
      default: 0 
    },
  upcomingTasks: { 
    type: Number, 
    default: 0
 },
  responseRate: { 
    type: String,
     default: "0%"
    
},
});

export default DailyStatsSchema;
