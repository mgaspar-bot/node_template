import {Request, Response} from "express"
import { sign } from "jsonwebtoken";
import { ModelStatic, Model } from "sequelize";
const User : ModelStatic<Model> = require('../models/User');
require('dotenv').config()

async function signinPostController (req:Request, res: Response) {
    //get username, put it in db
    //sign token with password
    //send it to user

    // console.log(process.env.AUTH_SECRET);
    
    const newUsername: string = req.body.username;
    const password: string = req.body.password;

    const accessToken : string = sign({username:newUsername}, process.env.AUTH_SECRET+password);

    await User.upsert({
        username:newUsername
    })
    res.status(201).send({
        "msg":"user registered, here's your token",
        "token": accessToken
    });    
}


module.exports = signinPostController;