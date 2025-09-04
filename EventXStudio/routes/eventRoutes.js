const express = require("express");
const router = express.Router();
const { getEvents, createEvent, deleteEvent } = require("../controllers/eventController");
const { protect, admin } = require("../middleware/authMiddleware");

// Routes
router.get("/", getEvents);
router.post("/", protect, admin, createEvent);
router.delete("/:id", protect, admin, deleteEvent);

// Book ticket route
router.post("/:id/book", protect, async (req, res) => {
  const Event = require("../models/Event");
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  if (event.bookedSeats >= event.totalSeats) return res.status(400).json({ message: "No seats left" });

  event.bookedSeats += 1;
  await event.save();
  res.json({ message: "Ticket booked", event });
});

module.exports = router;

