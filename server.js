const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Professional = require('./models');

const app = express();
const PORT = 8080;

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// GET endpoint - reads data from MongoDB
app.get('/professional', async (req, res) => {
  try {
    let data = await Professional.findOne();
    
    if (!data) {
      return res.json({ message: 'No data found. Please run node seed.js' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/professional`);
});