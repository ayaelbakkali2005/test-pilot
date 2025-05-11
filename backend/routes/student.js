// backend/routes/student.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {
  getExamQuestions,
  submitExam
} = require('../controllers/studentController');

//Route pour ajouter un étudiant (typeUtilisateur = "etudiant")
router.post('/register', async (req, res) => {
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

    // Créer un nouvel étudiant
    const newStudent = new User({
      email,
      motDePasse,
      nom,
      prenom,
      dateNaissance,
      sexe,
      etablissement,
      filiere,
      typeUtilisateur: "etudiant"
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({
      message: "Étudiant créé avec succès",
      user: savedStudent
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route GET pour récupérer les questions d’un examen
// URL: /api/student/exam/:examId/questions
// Cette route récupère les questions avec leurs durées pour affichage enchaîné
router.get('/exam/:examId/questions', getExamQuestions);

// Route POST pour soumettre les réponses d’un étudiant
// URL: /api/student/exam/:examId/submit
//  Cette route permet à l'étudiant de soumettre ses réponses
router.post('/exam/:examId/submit', submitExam);

module.exports = router;
