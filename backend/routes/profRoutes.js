const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ajouter un enseignant (typeUtilisateur = "enseignant")
router.post('/', async (req, res) => {
  try {
    const { 
      email, 
      motDePasse, 
      nom, 
      prenom, 
      dateNaissance, 
      sexe, 
      etablissement, 
      filiere 
    } = req.body;

    const newProf = new User({
      email,
      motDePasse,
      nom,
      prenom,
      dateNaissance,
      sexe,
      etablissement,
      filiere,
      typeUtilisateur: "enseignant"
    });
    const savedProf = await newProf.save();
    res.status(201).json({
      message: "Enseignant créé avec succès",
      user: savedProf
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;