import { Router } from "express";
import { Request, Response } from "express";

const express = require('express');
const router : Router = express.Router();

router.get('/', (req:Request, res: Response) => { // TODO properly implement this
    //get id and password from req
    console.log(req.body.username, req.body.password);

    const username  : string = req.body.username;
    const  password : string= req.body.password;
    
    if (username === 'admin' && password === 'admin'){
        res.status(200).send({
            "msg": "welcome admin"
        })
    } else {
        res.status(401).send({
            "msg":"incorrect username or password"
        })
    }
    
    //check with db
    
    
    //return token if 200, 401 unauthorized if not
})

module.exports = router;

