const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://bud_mcchud:rnTlcVSHyFRTuhlY@meleestatstest.otlcm.mongodb.net/MeleeStatsTest?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected to MongoDB server');
            callback(client);
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = mongoConnect;

