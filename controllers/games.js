const gameSchema = require('../models/games');
const { IncomingForm } = require('formidable');
const {default: SlippiGame } = require('@slippi/slippi-js');

const uploadGame = (req, res) => {
    console.log("Upload request received");
    const formidableOptions = {
        keepExtensions: true,
        allowEmptyFiles: false,
    }
    const form = new IncomingForm(formidableOptions);
    let docId = "";
    form.parse(req, (err) => {
        if(err){
            res.status(500).send("ERROR: could not parse form data");
        }
    });
    form.on('file', (formName, file) => { // Emitted once for each file (only allowing one file at a time, so only once)
        // file.path - location of file in local filesystem
        const game = new SlippiGame(file.path);
        saveUploadedGame(game);
    });
    form.on('end', (filePaths) => { // Emitted right after all files write to disk, NOT after saving to DB
        res.status(200).send();
    })
};

const saveUploadedGame = (uploadedGame) => {
    const metadata = uploadedGame.getMetadata();
    const settings = uploadedGame.getSettings();
    const frames = uploadedGame.getFrames();
    const stats = uploadedGame.getStats();

    const game = new gameSchema({
        metadata: metadata,
        settings: settings,
        frames: Object.values(frames),
        stats: stats,
    });

    console.log("Attempting to save game...");
    game.save().then((savedGame) => {
        console.log("Game created successfully with _id:", savedGame._id);
    }).catch((err) => {
        console.log(err);
    });
}

const createGame = (req, res) => {
    const game = new gameSchema({
        metadata: req.body.metadata,
        settings: req.body.settings,
        frames: Object.values(frames),
        stats: req.body.stats,
    });


    game.save().then(() => {
        console.log('Game created');
        res.status(200).json({message: 'Game created'});
    }).catch((err) => {
        res.status(500).json({message: err});
    });

};

const getGame = (req, res) => {
    gameSchema.find({_id: req.params.id}, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: err});
        } else {
            res.status(200).json(results);
        }
    });
};

const getRandomGame = (req, res) => {
    console.log("Attempting to retrieve random game...");
    gameSchema.findOneRandom((err, results) => {
        if(err){
            console.log(err);
            res.status(500).json({message: err});
        } else {
            console.log("Game successfully retrieved");
            res.status(200).json(results);
        }
    });
};

const getMostRecentGame = (req, res) => {
    console.log("Attempting to retrieve most recent game...");
    gameSchema.findOne().sort({uploadTime: -1}).exec((err, results) => {
        if(err){
            console.log(err);
            res.status(500).json({message: err});
        } else {
            console.log("Game successfully retrieved");
            res.status(200).json(results);
        }
    })
}

const getAllGames = (req, res) => {
    console.log("Serving request for all saved games...");
    gameSchema.find({}, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({message: err});
        } else {
            res.status(200).json(results);
            console.log("Request served successfully")
        }
    });
};

// Updates should be async
const updateGame = async (req, res) => {
    const gameUpdate = await gameSchema.findOneAndUpdate({_id: req.params.id}, {
            $set: {
                settings: req.body.settings,
                frames: Object.values(req.body.frames),
                stats: req.body.stats,
            },
        },
        {new: true});
    if(gameUpdate) {
        res.status(200).json({message: 'Game successfully updated'});
    } else {
        res.status(500).json({message: 'Could not update game'});
    }
};



// Deletes should be async
const deleteGame = async(req, res) => {
    const taskDelete = await gameSchema.findByIdAndDelete({_id: req.params.id});
    if(taskDelete){
        res.status(200).json({message: 'Game deleted'});
    } else {
        res.status(500).json({message: 'Could not delete game'});
    }

};

module.exports = {
    uploadGame,
    createGame,
    getGame,
    getMostRecentGame,
    getAllGames,
    getRandomGame,
    updateGame,
    deleteGame
};
