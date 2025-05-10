const Question = require('../models/Question');

// ✅ Ajouter une nouvelle question avec durée et note
exports.createQuestion = async (req, res) => {
  try {
    const {
      examId,
      text,
      correctAnswer,
      tolerance,
      duration,
      note
    } = req.body;

    const question = new Question({
      examId,
      text,
      correctAnswer,
      tolerance,
      duration,
      note
    });

    const saved = await question.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Récupérer toutes les questions (inchangé)
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
