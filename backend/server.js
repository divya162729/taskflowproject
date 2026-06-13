// backend/server.js

// Load environment variables
// Fix for MongoDB Atlas SRV ECONNREFUSED in some environments
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); // Cloudflare + Google DNS
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check / root route
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API running' });
});

// API routes (all under /api/*)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/routines', require('./routes/routineRoutes'));

// Port (Render sets PORT env automatically)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});