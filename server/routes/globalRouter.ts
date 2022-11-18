import { Router, Request, Response } from "express";
const express = require('express');
const router: Router = express.Router();

const signinRouter = require('./signinRouter');
const authMiddleware = require('../Middlewares/authMiddleware')
const loginRouter = require('./loginRouter');



router.use('/signin', signinRouter );
router.use('/login', loginRouter);
router.get('/', authMiddleware, (req: Request, res: Response) => {
    // Get your info
    res.status(200).send({
        "msg":"i got through the middleware!"
    });
});

module.exports = router;