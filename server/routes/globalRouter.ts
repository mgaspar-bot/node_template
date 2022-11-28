import { Router, Request, Response } from "express";
const express = require('express');
const router: Router = express.Router();

const signinRouter = require('./signinRouter');
import { authMiddleware } from "../Middlewares/authMiddleware";
const loginRouter = require('./loginRouter');
const getMessagesRouter = require('./getMessagesRouter');
const roomsRouter = require('./roomsRouter')

router.use('/signin', signinRouter );
router.use('/login', loginRouter);
router.use('/rooms', authMiddleware, roomsRouter);
router.use('/messages', authMiddleware, getMessagesRouter);

module.exports = router;