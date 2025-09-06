import express from "express";
import Ticket from "../models/ticket.js";
import Event from "../models/event.js";
import User from "../models/user.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/book", authMiddleware, async (req, res) => {
  try {
    const { eventId, seatNumber } = req.body;
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (!event.name) return res.status(400).json({ message: "Event has no name" });
    const seat = event.seatAllocation.find(
      (s) => Number(s.seatNumber) === seatNumber
    );
    if (!seat || seat.status === "Paid" || seat.status === "Reserved Seats") {
      return res.status(400).json({ message: "Seat not available" });
    }
    const qrCodeUrl = `https://dummy-payment.com/ticket/${eventId}_${user._id}_${seatNumber}`;
    const ticket = await Ticket.create({
      eventId,
      eventName: event.name,
      userId: user._id,
      seatNumber,
      status: "Paid",
      qrCodeUrl,
    });

    seat.status = "Paid";
    await event.save();

res.json({ ticket: ticket.toObject({ getters: true }) });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:ticketId", authMiddleware, async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId).populate("eventId");
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/my-tickets", authMiddleware, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id }).populate("eventId");
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
