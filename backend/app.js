const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.json({ message: "API Opérationnelle" });
});

// ✅ Route pour la géolocalisation
const geolocRoutes = require('./routes/geoloc');
app.use('/api/geoloc', geolocRoutes);



module.exports = app;
