const express = require('express');
const comboVizController = require('../controllers/comboViz');

const router = express.Router();

// GET /comboViz/game
// get game data
router.get('/allGames', comboVizController.getAllGames);
router.get('/games/:date', comboVizController.getGamesByDate);
router.get('/games/:gameID', comboVizController.getGameByID);

module.exports = router;

