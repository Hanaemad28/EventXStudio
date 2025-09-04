// models/Event.js
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    price: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    bookedSeats: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);

