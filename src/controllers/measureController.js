// controllers/measureController.js
const Measure = require('../models/Measure');

exports.createMeasure = async (req, res) => {
  try {
    const measure = new Measure(req.body);
    await measure.save();
    res.status(201).json(measure);
  } catch (err) {
    console.error('Error saving measure:', err);
    res.status(400).json({ error: 'Failed to save measurement' });
  }
};

exports.getMeasures = async (req, res) => {
  try {
    const measures = await Measure.find().sort({ timestamp: -1 }).limit(100);
    res.json(measures);
  } catch (err) {
    console.error('Error fetching measures:', err);
    res.status(500).json({ error: 'Failed to fetch measurements' });
  }
};
