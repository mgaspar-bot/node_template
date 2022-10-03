const express = require('express');
const router = express.Router();
const cors = require('cors');
const {authMiddleware, cacheControl} = require('../Middlewares/timeMiddleware')

/*
Per fer que rebi per POST com a parametre un JSON amb el username 
podem posar el username i la password com a headers en el POSTMAN,
i hi accedim amb req.headers

He provat de posar coses a Params i al Body pero no s'hi pot accedir 
simplement fent req.params o req.body
*/

router.post('/', cors(), authMiddleware, cacheControl, (req, res) => {
    // console.log('Im in the last function');
    // console.log(res);
    let now = (new Date()).toISOString();
    now = now.split('T');
    const hora = now[1];
    const data = now[0];
    res.send({
        "data":data,
        "hora":hora
    });
});

module.exports = router;
