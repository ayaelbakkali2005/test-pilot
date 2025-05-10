const express = require('express');
const cors = require('cors');

const app = express();


//hhh
// Middlewares

app.use(cors());
app.use(express.json());

// Importation des routes
const examRoutes = require('./routes/examRoutes');
app.use('/api/exams', examRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: "API Opérationnelle" });
});


// ✅ Route pour la géolocalisation
const geolocRoutes = require('./routes/geoloc');
app.use('/api/geoloc', geolocRoutes);



// Export pour server.js
module.exports = app;
