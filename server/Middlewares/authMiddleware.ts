import {Request, Response} from "express"
import { JwtPayload, verify }  from 'jsonwebtoken'
import { ModelStatic, Model } from "sequelize";
const jwt = require('jsonwebtoken')
const User : ModelStatic<Model> = require('../models/User')

async function authMiddleware (req:Request, res: Response, next : Function) : Promise<void | Response> {
    // Get token from request
    let token : string | undefined = (req.headers.authorization)?.split(' ')[1]; // Espero que vingui com a BEARER token
    if ( token === undefined) return res.status(401).send({"msg":"you have no token, stranger"});
    // Check env variable (if its undefined, verify function crashes the server)
    if (process.env.AUTH_SECRET === undefined) return res.status(500).send({"msg":"my environment variables are fucked up (authMiddleware)"})
    // Verify token, extract its payload
    try {
        var payload : string | JwtPayload = verify(token, process.env.AUTH_SECRET); // sense options torna una objecte "Jwtpayload", que te les propietats que li vas signar        
    } catch (error) {
        console.log(error);
        return res.status(401).send({"msg": "i couldn't verify your token"})
    }
    // Check the payload inside the token is correct and matches someone in my database
    if (typeof payload === 'string' || !payload.username || !payload.password) return res.status(401).send({"msg":"this token wasnt signed by me"}); 
    let found = await User.findOne({
        where:{
            username : payload.username,
            password : payload.password
        }
    });
    if (found === null) return res.status(400).send({"msg":"token has wrong username or password signed inside"})

    // maybe put id and username in req so the controller can send it back to the user
    next();    
}

module.exports = authMiddleware;