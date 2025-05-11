const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const verifyToken = require('../middlewares/auth');

// ✅ Routes protégées
router.post('/', verifyToken, questionController.createQuestion);
router.get('/', verifyToken, questionController.getAllQuestions);

module.exports = router;
