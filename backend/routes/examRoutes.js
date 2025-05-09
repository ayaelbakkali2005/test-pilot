// backend/routes/examRoutes.js
const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Route pour créer un examen
router.post('/', examController.createExam);

// Route pour récupérer tous les examens
router.get('/', examController.getAllExams);

module.exports = router;
