
require('dotenv').config()

const authMiddleware = function (req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    if (username !== process.env.USERNAME  || password !== process.env.PASSWORD) {
        res.status(401).json({
            "error":"wrong user or password"
        });
        return;
    };
    next();
}


const authMiddleware2 = async function (req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    try {
        if (username != process.env.USERN  || password != process.env.PASSWORD) {
            throw new Error('Wrong username or password');
        }
        next(); 
    }catch (error) {
        res.status(401).send("Wrong username or password");
        console.log(error.message);
    }
}

exports.authMiddleware = authMiddleware2

function cacheControl (req, res, next) {
    res.set('Cache-Control', 'no-cache') 
    next()
}

exports.cacheControl = cacheControl;
