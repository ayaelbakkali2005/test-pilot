const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  tolerance: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Question', questionSchema);
