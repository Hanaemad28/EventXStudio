const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Routes
const eventsRouter = require('./routes/eventRoutes');
app.use('/api/events', eventsRouter);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
