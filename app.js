const express = require('express');
const bodyParser = require('body-parser');

const comboVizRoutes = require('./routes/comboViz');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/comboViz', comboVizRoutes);

app.listen(8080);
console.log("Listening on port 8080...");
