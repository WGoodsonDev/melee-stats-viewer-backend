const express = require('express');
const mongoConnect = require('./util/database').mongoConnect;
require('dotenv/config');

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


mongoConnect(() => {
    app.listen(8080);
    console.log("Listening on port 8080...");
});
