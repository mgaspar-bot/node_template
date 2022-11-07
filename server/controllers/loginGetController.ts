import {Request, Response} from "express"

function loginGetController (req:Request, res: Response) {
    //get id and password from req
    console.log(req.body.username, req.body.password);

    const username  : string = req.body.username;
    const  password : string = req.body.password;

    
    if (username === 'admin' && password === 'admin'){
        res.status(200).send({
            "msg": "welcome admin"
        })
    } else {
        res.status(401).send({
            "msg":"incorrect username or password"
        })
    }
    
    /*
    TODO
    jwt.verify("server_secret"+user_password)
        if i can decrypt the token, the password is right
    */
}


module.exports = loginGetController;