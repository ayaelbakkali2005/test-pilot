const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route Example
app.get('/', (req, res) => {
  res.send('API TestPilot est en ligne');
});

module.exports = app;