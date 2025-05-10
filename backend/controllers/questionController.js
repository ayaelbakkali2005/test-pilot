const Question = require('../models/Question');
//
// Ajouter une nouvelle question
exports.createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    const saved = await question.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Récupérer toutes les questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
