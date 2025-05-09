// backend/controllers/examController.js

const Exam = require("../models/Exam");

// Ajouter un nouvel examen
exports.createExam = async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Afficher tous les examens
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
