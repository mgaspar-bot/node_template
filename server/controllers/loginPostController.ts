import {Request, Response} from "express"
const User = require('../models/User');

async function loginPostController (req:Request, res: Response) {
    //get username, put it in db
    //sign token with password
    //store token
    //send token to user


    /*
    just ask you for a username and a password and sign a token the Omar way

            // const accesToken =  jwt.sign({ username: username }, "server_secret"+password);
                //aquesta es la idea del Omar, usar la password per signar el token i despres utilitzar-la al verificar de
                //manera que mai la guardes pero sempre et cal per obtenir el token
    */
    let askedPolitely: string = req.body.asked;
    if(askedPolitely !== 'please') {
        res.status(401).send({
            "msg":"whats the magic word?"
        })
        return;
    }
    //send the token

}


module.exports = loginPostController;