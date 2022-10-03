
require('dotenv').config()

const authMiddleware = function (req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    if (username !== process.env.USERNAME  || password !== process.env.PASSWORD) {
        // throw new Error('empty user or password');
        res.status(401).json({
            "error":"wrong user or password"
        });
        return;
        /*
        Altre cop, si no li poses el return segueix 
        executant-se però quan arriba al altre res.send
        li dona error pq ja ha respost.

        Al fer middlewares cal recordar sempre que estas
        controlant el flux d'execució, si no t'interessa seguir
        has de fer return ABANS de la crida a next()
        
        Lo de intentar llençar un error para el fluxe d'execucio 
        torna automaticament status 500 internal server error. 
        On podria posar els catch pq no fes aixo?
        */
    };
    next();
}


const authMiddleware2 = async function (req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    // console.log(username, password);
    // console.log(process.env.USERN, process.env.PASSWORD); //TODO no m'està agafant els .env
    try {
        if (username != process.env.USERN  || password != process.env.PASSWORD) {
            throw new Error('Wrong username or password');
        }
        next(); 
    }catch (error) {
        res.status(401).send("Wrong username or password");
        //Despres del status, el .send sembla que no fa res mentre que el .json sí que envia un json
        console.log(error.message);
    }
}

exports.authMiddleware = authMiddleware2

function cacheControl (req, res, next) {
    res.set('Cache-Control', 'no-cache') 
    // res.header('Cache-control','no-cache');
    next()
}
/*
metode .set (alias .header) per canviar (afegir) fields del
header de response.
Resulta que n'hi ha un que es diu Cache-control
*/

exports.cacheControl = cacheControl;
