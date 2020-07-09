const express = require('express');
const comboVizController = require('../controllers/comboViz');

const router = express.Router();

// GET /comboViz/game
// get game data
router.get('/all-games', comboVizController.getAllGames);
router.get('/games/:date', comboVizController.getGamesByDate);
router.get('/games/:gameID', comboVizController.getGameByID);

router.get('/add-game', comboVizController.getAddGame);

router.post('/add-game', comboVizController.postAddGame);

module.exports = router;

