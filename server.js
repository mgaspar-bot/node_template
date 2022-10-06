const express = require('express');
const app = express();


app.use(express.json());

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const uploadRouter = require('./routes/upload');
app.use('/upload', uploadRouter);

const timeRouter = require('./routes/time');
app.use('/time', timeRouter);

const pokemonRouter = require('./routes/pokemon');
app.use('/pokemon', pokemonRouter);

app.listen(3000, () => console.log('Server escoltant al port 3000'));
