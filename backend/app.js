const express = require('express');
const cors = require('cors');

// Initialisation de l'application Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.json({ message: "API Opérationnelle" });
});

// Export pour server.js
module.exports = app;