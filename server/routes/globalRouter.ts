import { Router, Request, Response } from "express";
const express = require('express');
const router: Router = express.Router();

const signinRouter = require('./signinRouter');
const authMiddleware = require('../Middlewares/authMiddleware')
const loginRouter = require('./loginRouter');

router.use('/signin', signinRouter );
router.use('/login', loginRouter);
router.get('/', authMiddleware, (req: Request, res: Response) => {
    
    res.send({
        "msg":"i got through the middleware!"
    })
})

module.exports = router;