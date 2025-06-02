const express = require('express');
const router = express.Router();
const measureController = require('../controllers/measureController');

router.post('/', measureController.createMeasure);
router.get('/', measureController.getMeasures);

module.exports = router;
