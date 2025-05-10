const express = require('express');
const cors = require('cors');

const examRoutes = require('./routes/examRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/exams', examRoutes);
app.use('/api/questions', questionRoutes);

app.get('/', (req, res) => {
  res.json({ message: "API Opérationnelle" });
});

module.exports = app;
