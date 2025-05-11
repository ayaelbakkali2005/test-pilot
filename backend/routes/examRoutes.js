const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const verifyToken = require('../middlewares/auth');

// ✅ Routes protégées
router.post('/', verifyToken, examController.createExam);
router.get('/', verifyToken, examController.getAllExams);

module.exports = router;
