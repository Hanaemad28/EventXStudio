const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  venue: String,
  price: Number,
  seats: Number
});

module.exports = mongoose.model('Event', eventSchema);

