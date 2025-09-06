import express from "express";
import Event from "../models/event.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
const event = new Event({
      ...req.body,
      isDraft: req.body.isDraft || false  
    });    await event.save();
    res.status(201).json({ message: "Event created", event });
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
});
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event updated", event: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating event", error: err.message });
  }
});
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", error: err.message });
  }
});
export default router;
