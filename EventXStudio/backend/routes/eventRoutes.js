// routes/eventRoutes.js
const express = require("express");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const auth = require("../middleware/auth");

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Seed sample events (one-off)
router.post("/seed", async (req, res) => {
  try {
    const count = await Event.countDocuments();
    if (count > 0) return res.json({ message: "Events already exist" });
    const sample = [
      {
        title: "Tech Conf 2025",
        description: "A modern tech conference.",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        venue: "Cairo Expo",
        price: 50,
        totalSeats: 100,
      },
      {
        title: "Music Night",
        description: "Live indie performances.",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        venue: "Downtown Arena",
        price: 35,
        totalSeats: 80,
      },
    ];
    const created = await Event.insertMany(sample);
    res.json({ message: "Seeded", created });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create new event
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (e) {
    res.status(400).json({ message: "Invalid event data" });
  }
});

// Delete event by id
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Book a seat (requires token) — creates a Ticket entry
router.post("/:id/book", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.bookedSeats >= event.totalSeats) {
      return res.status(400).json({ message: "Sold out" });
    }

    event.bookedSeats += 1;
    await event.save();

    // create ticket in DB
    const qrPayload = `TICKET-${event._id}-${req.userId}-${Date.now()}`;
    const ticket = await Ticket.create({
      event: event._id,
      user: req.userId,
      qr: qrPayload,
    });

    res.json({ message: "Booked", ticket, event });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

