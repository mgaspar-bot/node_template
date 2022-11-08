import {Request, Response} from "express"
import { JwtPayload }  from 'jsonwebtoken'
import { ModelStatic, Model } from "sequelize";
const jwt = require('jsonwebtoken')
const User : ModelStatic<Model> = require('../models/User')

function authMiddleware (req:Request, res: Response, next : Function) {
    //get id and password from req
    // console.log(req.body.username, req.body.password);
    
    const username : string = req.body.username;
    const password : string = req.body.password;
    const token : string = req.body.token;
    try { 
        jwt.verify(token, process.env.AUTH_SECRET+password, async (error : Error | undefined, data : JwtPayload) => {
            if(error){
                res.status(401).send({
                    "msg":"Bad token (authMiddleware)"
                });
                return;
            }
            try {
                let found = await User.findOne({
                    where:{
                        username : username
                    }
                })
                if (data.username === username && found !== null){
                    next();
                } else {
                    res.status(401).send({
                        "msg":"i dont know what you're trying and i dont like it"
                    })
                }
                
            } catch (error) {
                console.log('ERROR AT AUTHMIDDLEWARE WITH QUERY');
                console.log(error);
                res.status(400).send({
                    "msg":"error thrown querying db"
                })
                return;
            }
        });
    } catch (error) {
        console.log('ERROR AT AUTHMIDDLEWARE WITH VERIFY');
        console.log(error);
        res.status(400).send({
            "msg":"error thrown verifying token"
        })
        return;    
    }
}

/*
Et loguejes amb username, password i token, tot al body
verify al token i comprovo que el username estigui a la db
*/

module.exports = authMiddleware;