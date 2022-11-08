import { Router, Request, Response } from "express";
const express = require('express');
const router: Router = express.Router();

const signinRouter = require('./signin');
const authMiddleware = require('../Middlewares/authMiddleware')


router.use('/signin', signinRouter )
router.get('/', authMiddleware, (req: Request, res: Response) => {
    req;
    
    res.send({
        "msg":"i got through the middleware!"
    })
})

module.exports = router;