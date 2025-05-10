const express = require('express');
const router = express.Router();
const Geolocation = require('../models/Geolocation');

// Route pour enregistrer la géolocalisation
router.post('/register', async (req, res) => {
    try {
        const { userId, ip, latitude, longitude } = req.body;

        // Créer une nouvelle entrée de géolocalisation
        const newGeo = new Geolocation({ userId, ip, latitude, longitude });
        await newGeo.save();

        res.status(201).json({ message: 'Géolocalisation enregistrée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la géolocalisation', error });
    }
});

module.exports = router;
