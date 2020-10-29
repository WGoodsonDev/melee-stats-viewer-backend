const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    settings: {
        type: Object,
        required: true
    },
    frames: {
        type: Object,
        required: true
    },
    stats: {
        type: Object,
        required: true
    },
})

module.exports = mongoose.model('Game', GameSchema);
