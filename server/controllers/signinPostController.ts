import {Request, Response} from "express"
import { sign } from "jsonwebtoken";
import { hash } from "bcryptjs"
import { ModelStatic, Model } from "sequelize";
const User : ModelStatic<Model> = require('../models/User');
require('dotenv').config()

async function signinPostController (req:Request, res: Response) {
    // Get username and password from request body
    const newUsername: string = req.body.username;
    const password: string = req.body.password;
    if (!newUsername || !password) return res.status(400).send({"msg":"username or password fields missing from body"});
    // Check username is new
    let alreadyExists = await User.findOne({
        where:{
            username:newUsername
        }
    });
    if (alreadyExists !== null) return res.status(409).send({"msg":"user already exists, please log in"});
    // store user in db with hashed password
    const encryptedPassword : string = await hash(password, 10);
    try {
        await User.upsert({
            username:newUsername,
            password: encryptedPassword
        });
        
    } catch (error) {
        console.log(error);
        console.log(`ERROR IN UPSERT QUERY IN SIGNINPOSTCONTROLLER`);
        return res.status(500).send({"msg":"something went wrong querying the db"});        
    }
    // Sign token and send it to user
    if (process.env.AUTH_SECRET === undefined) return res.status(500).send({"msg":"my environment variables are fucked up (siginPostController)"});
    const token = sign({username : newUsername, password: encryptedPassword}, process.env.AUTH_SECRET);    
    res.status(201).send({
        "msg":"user registered, here's your token",
        "accesToken": token
    });
}

module.exports = signinPostController;