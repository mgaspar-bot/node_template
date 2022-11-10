import {Request, Response} from "express";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { ModelStatic, Model } from "sequelize";
const User : ModelStatic<Model> = require('../models/User');
require('dotenv').config();

async function loginGetController (req : Request, res : Response) {
    const username : string = req.body.username;
    const password : string = req.body.password;
    if (!(username && password)) return res.status(400).send({"msg":"username or password fields missing from body"})

    const user : Model | null =  await User.findOne({
        where:{
            username : username
        }
    });
    if (user === null) return res.status(401).send({ "msg":"user does not exist in db"});

    if (!(await compare(password, user.dataValues.password)))  return res.status(401).send({"msg": "wrong password"})
    // El type te un munt de coses de Sequelize, la info de la db esta a la propietat "datavalues"

    if (process.env.AUTH_SECRET === undefined) return res.status(500).send({"msg":"my environment variables are fucked up (loginGetController)"});
    const token = sign({username : username, password: user.dataValues.password}, process.env.AUTH_SECRET);

    res.status(200).send({
        "msg":"welcome friend, here's your token",
        accessToken : token
    });

}

module.exports = loginGetController;