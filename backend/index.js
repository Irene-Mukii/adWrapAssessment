require('dotenv').config();
const express = require('express');
const cors = require("cors");

const workspaceRoutes = require('./routes/workspaceRoutes');
const staticMediaRoutes = require('./routes/staticMediaRoutes');
const streetPoleMediaRoutes = require('./routes/streetPoleMediaRoutes');
const faceRoutes = require('./routes/faceRoutes');
const routeRoutes = require('./routes/routeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Allow requests from the frontend origin
app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend's URL
}));

// Routes
app.use('/workspaces', workspaceRoutes);
app.use('/static-media', staticMediaRoutes);
app.use('/street-pole-media', streetPoleMediaRoutes);
app.use('/faces', faceRoutes);
app.use('/routes', routeRoutes);

// Export the app for testing
module.exports = app;

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }