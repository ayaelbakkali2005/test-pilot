// backend/models/Exam.js

const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // durée en minutes
    required: true
  }
});

module.exports = mongoose.model("Exam", examSchema);
