// backend/routes/student.js
const express = require('express');
const router = express.Router();
const {
  getExamQuestions,
  submitExam
} = require('../controllers/studentController');

// Route GET pour récupérer les questions d’un examen
// URL: /api/student/exam/:examId/questions
router.get('/exam/:examId/questions', getExamQuestions);

// Route POST pour soumettre les réponses d’un étudiant
// URL: /api/student/exam/:examId/submit
router.post('/exam/:examId/submit', submitExam);

module.exports = router;
