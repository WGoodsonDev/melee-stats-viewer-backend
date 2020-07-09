const getDB = require('../util/database').getDB;

class Game {
    constructor(settings, frames, stats) {
        this.settings = settings;
        this.frames = frames;
        this.stats = stats;
    }

    save() {
        // noSQL levels:
        // Database
        const db = getDB();
        // Collection by name, followed by MongoDB commands
        return db.collection('games')
            .insertOne(this)
            .then( res => {
                // console.log(res);
            })
            .catch( err => {
                console.log(err);
            });
        // Document

    }

}


module.exports = Game;
