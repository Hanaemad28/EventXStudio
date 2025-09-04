// routes/ticketRoutes.js
const express = require("express");
const Ticket = require("../models/Ticket");
const auth = require("../middleware/auth");
const router = express.Router();

// GET my tickets
router.get("/mine", auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.userId }).populate("event");
    res.json(tickets);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

