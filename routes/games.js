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

// Update (PATCH)
router.patch('/updateGame/:id', gamesController.updateGame);

// Delete (DELETE)
router.delete('/deleteGame/:id', gamesController.deleteGame);


module.exports = router;
