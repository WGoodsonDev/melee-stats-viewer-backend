const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const gamesRoutes = require('./routes/games');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('dotenv/config');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// app.use('/api/users', userRoutes);

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
    app.listen(process.env.PORT, () => { console.log(`API running at: http://localhost:${process.env.PORT}`)});
}).catch((err) => {
    console.log(err);
});
