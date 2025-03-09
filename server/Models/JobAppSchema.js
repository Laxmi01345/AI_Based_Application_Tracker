
import mongoose from "mongoose";

const JobAppSchema = new mongoose.Schema({
  company: { type: String },
  role: { type: String },
  status: {
    type: String,
    enum: ["Applied","Accepted", "Interview", "Rejected", "Offer"],
    required: true,
  },
  receivedAt: { type: Date, default: Date.now },
});

export default JobAppSchema;
