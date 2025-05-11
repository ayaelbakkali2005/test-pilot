const express = require('express');
const router = express.Router();
const Prof = require('../models/Prof');

router.post('/', async (req, res) => {
  try {
    const prof = new Prof(req.body);
    const saved = await prof.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
