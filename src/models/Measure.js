const mongoose = require('mongoose');

const measureSchema = new mongoose.Schema({
  air_quality: { type: Number },
  temperature: { type: Number },
  relative_humidity: { type: Number },
  soil_humidity: { type: Number },
  light_intensity: { type: Number },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Measure', measureSchema);
