const express = require('express');
const router = express.Router();

const playerRouter = require('./players');
const gamesRouter = require('./games');
const validateId = require('../Middlewares/validateId');

router.use('/players', playerRouter);
router.use('/games/:id', validateId, gamesRouter);

module.exports = router;