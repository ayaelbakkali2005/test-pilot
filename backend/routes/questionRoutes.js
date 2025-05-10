const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
//H
router.post('/', questionController.createQuestion);
router.get('/', questionController.getAllQuestions);

module.exports = router;
