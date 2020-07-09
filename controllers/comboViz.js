const Game = require('../models/game');

exports.getAllGames = (req, res, next) => {
    res.status(200).json({
        games: [
            {
                title: 'Game_20200707T185105.slp',
                url: 'game_files/Game_20200707T185105.slp'
            }
        ]
    });
};

exports.getGamesByDate = (req, res, next) => {
    res.status(200).json({
        game: "Game data goes here"
    });
};

exports.getGameByID = (req, res, next) => {
    res.status(200).json({
        game: "Game data goes here"
    });
};

exports.getAddGame = (req, res, next) => {

};

exports.postAddGame = (req, res, next) => {
    console.log('postAddGame');
    const settings = req.body.settings;
    const frames = req.body.frames;
    const stats = req.body.stats;
    const game = new Game(settings, frames, stats);
    game
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Game');
        })
        .catch(err => {
            console.log(err);
        })
};
