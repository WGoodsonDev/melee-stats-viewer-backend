const gameSchema = require('../models/games');
const IncomingForm = require('formidable').IncomingForm;

const uploadGame = (req, res) => {
    console.log("Upload request received");
    const form = new IncomingForm();
    form.on('file', (field, file) => {
        // file.path - location of file in local filesystem
        console.log(file.path);
    });
    form.on('end', () => {
        res.json();
    })
    form.parse(req);
};

const createGame = (req, res) => {
    const game = new gameSchema({
        metadata: req.body.metadata,
        settings: req.body.settings,
        // frames: req.body.frames,
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

// Updates should be async
const updateGame = async (req, res) => {
    const gameUpdate = await gameSchema.findOneAndUpdate({_id: req.params.id}, {
            $set: {
                settings: req.body.settings,
                frames: req.body.frames,
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
    updateGame,
    deleteGame
};
