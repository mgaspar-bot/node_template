const express = require('express');
const router = express.Router();

const playerRouter = require('./players');
const gamesRouter = require('./games');
const validateId = require('../Middlewares/validateId');
const routerRanking = require('./ranking');
const loginRouter = require('./login');

router.use('/login',loginRouter);
router.use('/players', playerRouter);
router.use('/games/:id', validateId, gamesRouter);
router.use('/ranking', routerRanking);

module.exports = router;