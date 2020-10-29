const express = require('express');
const mongoose = require('mongoose');
const gamesRoutes = require('./routes/games');
require('dotenv/config');

const app = express();

app.use(express.json());

app.use('/api/games', gamesRoutes)


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
    app.listen(8080, () => { console.log('API running at: http://localhost:8080')});
}).catch((err) => {
    console.log(err);
});
