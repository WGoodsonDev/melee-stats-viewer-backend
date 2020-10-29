const mongoose = require('mongoose');

const mongoConnect = (callback) => {
    mongoose.connect(
        process.env.DB_CONNECTION,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    ).then(() => {
        console.log('Connection to database successful')
        callback();
    }).catch((err) => {
        console.log(err);
    });
}

exports.mongoConnect = mongoConnect;


