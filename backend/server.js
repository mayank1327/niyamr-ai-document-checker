const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const documentRoutes = require('./routes/documentRoutes');

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON data

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'NIYAMR AI Backend is running!',
    status: 'success',
    endpoints: {
        checkDocument: 'POST /api/check-document'
      }
  });
});

// API Routes
app.use('/api', documentRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    success: false, 
    error: error.message 
  });
});

// Set port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/check-document`);
});