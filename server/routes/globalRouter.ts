import { Router, Request, Response } from "express";
const express = require('express');
const router: Router = express.Router();

const signinRouter = require('./signinRouter');
const authMiddleware = require('../Middlewares/authMiddleware')
const loginRouter = require('./loginRouter');
const getMessagesRouter = require('./getMessagesRouter');

router.use('/signin', signinRouter );
router.use('/login', loginRouter);
router.use('/', authMiddleware, getMessagesRouter);

module.exports = router;