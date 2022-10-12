const express = require('express');
const router = express.Router();

const playerRouter = require('./players');
const gamesRouter = require('./games');
const routerRanking = require('./ranking');
const loginRouter = require('./login');
const validateId = require('../Middlewares/validateId');
const authenticateToken = require('../Middlewares/authenticateToken')
const adminLogin = require('../Middlewares/adminLogin')

router.use('/login', adminLogin, loginRouter);
router.use('/players', authenticateToken ,playerRouter);
router.use('/games/:id', authenticateToken ,validateId, gamesRouter);
router.use('/ranking', authenticateToken ,routerRanking);

module.exports = router;