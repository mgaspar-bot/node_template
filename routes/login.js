const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.post('/', (req, res) => {
   const name = req.body.name;
   const password = req.body.password;

   if (name === "admin" && password === "admin") { //En comptes d'aquest if podriem posar un middleware que busques si aquests usuari i password estan en una taula Admins de la db
    const idJson = {
        "name":name,
        "password":password
    }
    const accessToken = jwt.sign(idJson, process.env.AUTH_TOKEN_SECRET);
    res.status(200).json({
        "msg":"hola admin estimat, aqui tens el teu trokon",
        "accessToken":accessToken
    });
    
   } else {
    res.status(401).json({
        "msg":"tu no ets el meu estimat admin! fora d'aqui!"
    })
   }
})

module.exports = router;