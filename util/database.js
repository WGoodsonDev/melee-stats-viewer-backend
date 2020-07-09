const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://bud_mcchud:rnTlcVSHyFRTuhlY@meleestatstest.otlcm.mongodb.net/MeleeStatsTest?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected to MongoDB server');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDB = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;

