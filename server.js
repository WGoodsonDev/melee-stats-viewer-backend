const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const gamesRoutes = require('./routes/games');
require('dotenv/config');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions));
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
