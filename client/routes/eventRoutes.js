import express from "express";
import Event from "../models/Event.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create new event (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      createdBy: req.user.id
    });
    await event.save();
    res.json({ message: "Event created successfully", event });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all events (public)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "username email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;

