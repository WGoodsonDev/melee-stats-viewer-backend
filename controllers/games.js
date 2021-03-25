const gameSchema = require('../models/games');
const IncomingForm = require('formidable').IncomingForm;
const {default: SlippiGame } = require('@slippi/slippi-js');

const uploadGame = (req, res) => {
    console.log("Upload request received");
    const form = new IncomingForm();
    form.on('file', (field, file) => {
        // file.path - location of file in local filesystem

        const game = new SlippiGame(file.path);
        saveUploadedGame(game);

    });
    form.on('end', () => {
        res.status(200).json();
    })
    form.parse(req);
};

const saveUploadedGame = (uploadedGame) => {
    const metadata = uploadedGame.getMetadata();
    // Metadata contains unique-identifying info
    // Use that info to check if game already exists
    // gameSchema.findOne({ metadata: metadata}, (err, game) => {
    //     if(err){
    //         console.log('Error: ', err);
    //         return;
    //     }
    //     if(game){
    //         console.log('Duplicate game found:');
    //         console.log(game.metadata);
    //     } else {
    //         console.log('No duplicate game found')
    //     }
    //
    // });

    const settings = uploadedGame.getSettings();
    const frames = uploadedGame.getFrames();
    const stats = uploadedGame.getStats();

    const game = new gameSchema({
        metadata: metadata,
        settings: settings,
        frames: Object.values(frames),
        stats: stats,
    });

    console.log("Attempting to save game...")
    game.save().then(() => {
        console.log('Game created successfully');
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
    console.log("Attempting to retrieve random game...")
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
    getAllGames,
    getRandomGame,
    updateGame,
    deleteGame
};
