const mongoose = require('mongoose');

const geolocationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  ip: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Geolocation', geolocationSchema);
