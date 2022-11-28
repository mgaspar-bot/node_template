import {Request, Response} from "express"
import { JwtPayload, verify }  from 'jsonwebtoken'
import { ModelStatic, Model } from "sequelize";
import { Socket } from "socket.io";
const jwt = require('jsonwebtoken')
const User : ModelStatic<Model> = require('../models/User')

export async function authMiddleware (req:Request, res: Response, next : Function) : Promise<void | Response> {
    console.log('im in the http middleware');
    // Get token from request
    let token : string | string[] | undefined = req.headers.accesstoken; // al enviar la request es peta les majuscules!!
    console.log(token);
    console.log(req.headers);
    
    
    if ( token === undefined || token instanceof Array) return res.status(401).send({"msg":"no token, or invalid format"});
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

export async function authMiddlewareSocket (socket : Socket,  next : Function) : Promise<void | Response> {
    console.log('im in the socket middleware');
    
    // Get token from request
    let token = socket.handshake.headers['accesstoken'];
    if ( token === undefined || token instanceof Array) {
        console.log(`No token or wrong format (socket middleware)`);
        console.log(socket.handshake.headers);
        
        socket.emit('pleaseLeave', socket.id);
        return;
    }
    // Check env variable (if its undefined, verify function crashes the server)
    if (process.env.AUTH_SECRET === undefined) {
        console.log(`Fucked up env variables (socket middleware)`);
        socket.emit('pleaseLeave', socket.id);
        return;    
    }
    // Verify token, extract its payload
    try {
        var payload : string | JwtPayload = verify(token, process.env.AUTH_SECRET); // sense options torna una objecte "Jwtpayload", que te les propietats que li vas signar        
    } catch (error) {
        console.log(' error verifying the token (socket middleware');
        console.log(error);
        socket.emit('pleaseLeave', socket.id);
        return;    
    }
    // Check the payload inside the token is correct and matches someone in my database
    if (typeof payload === 'string' || !payload.username || !payload.password) {
        console.log('payload in token doesnt have the type i expect (socket middleware');
        socket.emit('pleaseLeave', socket.id);
        return;
    }
    let found = await User.findOne({
        where:{
            username : payload.username,
            password : payload.password
        }
    });
    if (found === null) {
        console.log('payload info didnt match anyone in db');
        socket.emit('pleaseLeave', socket.id);
        return;
    }
    // maybe put id and username in req so the controller can send it back to the user
    next();    
}


