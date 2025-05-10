const express = require('express');
const cors = require('cors');

const examRoutes = require('./routes/examRoutes');
const questionRoutes = require('./routes/questionRoutes');
const geolocRoutes = require('./routes/geoloc'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/exams', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/geoloc', geolocRoutes); 

app.get('/', (req, res) => {
  res.json({ message: "API Opérationnelle" });
});

// ✅ Route pour la géolocalisation
const geolocRoutes = require('./routes/geoloc');
app.use('/api/geoloc', geolocRoutes);

// Export pour server.js
module.exports = app;
