// BACKEND DEVELOPER (Aditya): Main server file
// DATABASE ADMIN (Samrat): MongoDB connection
// FRONTEND-BACKEND LINK: Serves API for React app on port 5000

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// MIDDLEWARE (Aditya): Enable CORS for frontend, parse JSON
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// DATABASE CONNECTION (Samrat): Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err.message));

// API ROUTES (Aditya): Connect projects routes
app.use('/api/projects', require('./routes/projects'));

// HEALTH CHECK ENDPOINTS (for testing)
app.get('/', (req, res) => res.json({ message: 'EDUProject Hub Backend Running!' }));
app.get('/test', (req, res) => res.json({ status: 'Backend working perfectly!' }));

// ERROR HANDLING (Aditya): Catch 404
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/projects`);
});
