const express = require('express');
const router = express.Router();

const events = [
  { id: 1, name: "Event 1", date: "2025-09-04" },
  { id: 2, name: "Event 2", date: "2025-09-05" }
];

router.get('/', (req, res) => {
  res.json(events);
});

module.exports = router;

