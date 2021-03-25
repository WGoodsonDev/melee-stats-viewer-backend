const express = require('express');
const gamesController = require('../controllers/games');

// Initialize router
const router = express.Router();

// Upload (POST)
router.post('/uploadGame', gamesController.uploadGame);

// Create (POST)
router.post('/createGame', gamesController.createGame);

// Read (GET)
router.get('/getGame/:id', gamesController.getGame);

// Get all games (temporary)
router.get('/getAllGames/', gamesController.getAllGames);

// Get one random game
router.get('/getRandomGame', gamesController.getRandomGame)

// Get all games with specific netplay code
// router.get('/getGamesByPlayerCode/:playerCode', gamesController.getGamesByPlayerCode);

// Update (PATCH)
router.patch('/updateGame/:id', gamesController.updateGame);

// Delete (DELETE)
router.delete('/deleteGame/:id', gamesController.deleteGame);


module.exports = router;
