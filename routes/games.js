const express = require('express');
const gamesController = require('../controllers/games');

// const checkAuth = require('../middleware/check-auth');

// Initialize router
const router = express.Router();


// Read (GET)
router.get('/getGame/:id', gamesController.getGame);
router.get('/getGames/', gamesController.getGames);

// router.use(checkAuth);

// Upload (POST)
router.post('/uploadGame', gamesController.uploadGame);

// Create (POST)
router.post('/createGame', gamesController.createGame);



// Get all games with specific netplay code
// router.get('/getGamesByPlayerCode/:playerCode', gamesController.getGamesByPlayerCode);

// Update (PATCH)
router.patch('/updateGame/:id', gamesController.updateGame);

// Delete (DELETE)
router.delete('/deleteGame/:id', gamesController.deleteGame);


module.exports = router;
