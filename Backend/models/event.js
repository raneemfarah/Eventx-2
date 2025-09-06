import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ["Paid", "Reserved Seats", "Available Seats"],
    default: "Available Seats"
  }
});
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  venue: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, required: true },
  ticketPrice: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  popularity: {
    type: String,
    enum: ["High Popularity", "Medium Popularity", "Low Popularity"],
  },
  tags: [String],
  expectedAttendance: Number,
  seatAllocation: {
    type: [seatSchema],
    default: [] 
  },
  isDraft: { type: Boolean, default: false },
  qrCodeUrl: { type: String }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
