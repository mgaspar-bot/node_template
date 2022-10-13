const jwt = require('jsonwebtoken')
require('dotenv').config();

function authenticateToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({
            "msg":"no access token"
        })
        return;
    }
    token = token.split(' ')[1]; //Si ve com a bearer token, la string sera "BEARER 'token'"
    jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (error, data) =>{
        if (error) return res.status(403).json({"msg":"tens token pero no es valid"});

        const sessionTimestamp = require('../server').sessionTimestamp; //al posar el require aqui dins, nomes s'executa quan es crida a la funcio i aixi no es crea un cercle de requires
        
        if(data.timestamp === sessionTimestamp){
            next();
        } else {
            console.log(`The timestamp in your token and my last inici de sessio don't coincide`);
            res.status(403).json({
                "msg":"The timestamp in your token and my last inici de sessio don't coincide",
                "myTimestamp":sessionTimestamp,
                "urTokensTimestamp":data.timestamp
            })
        }
    })
}

module.exports = authenticateToken;