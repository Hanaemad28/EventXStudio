const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const jwt = require("jsonwebtoken");

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user payload
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

// @route POST /api/events
// @desc Create new event
// @access Private
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      createdBy: req.user.id,
    });

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

