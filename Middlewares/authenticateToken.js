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
        if (error) 
            return res.status(403).json({"msg":"tens token pero no es valid"});
        next();
    })
}




module.exports = authenticateToken;