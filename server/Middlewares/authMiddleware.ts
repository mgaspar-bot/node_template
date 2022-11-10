import {Request, Response} from "express"
import { JwtPayload, verify }  from 'jsonwebtoken'
import { ModelStatic, Model } from "sequelize";
const jwt = require('jsonwebtoken')
const User : ModelStatic<Model> = require('../models/User')

function authMiddleware (req:Request, res: Response, next : Function) {
    
    let token : string | undefined = (req.headers.authorization)?.split(' ')[1]; // Espero que vingui com a BEARER token
    if ( token === undefined) return res.status(401).send({"msg":"you have no token, stranger"});
    if (process.env.AUTH_SECRET === undefined) return res.status(500).send({"msg":"my environment variables are fucked up (authMiddleware)"})
    const payload : JwtPayload | string = verify(token, process.env.AUTH_SECRET); // sense options torna una payload
   


    
}

/*
Et loguejes amb username, password i token, tot al body
verify al token i comprovo que el username estigui a la db
*/

module.exports = authMiddleware;