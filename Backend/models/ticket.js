import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  eventName: { type: String, required: true },      
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seatNumber: { type: Number, required: true },
  status: { type: String, enum: ["Available Seat","Paid", "Reserved Seat"], default: "Available Seat" },
  qrCodeUrl: { type: String },}, { timestamps: true });

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
