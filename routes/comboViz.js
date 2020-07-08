const express = require('express');
const comboVizController = require('../controllers/comboViz');

const router = express.Router();

// GET /comboViz/game
router.get('/game', comboVizController.getGame);

module.exports = router;

