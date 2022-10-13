const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginRouter = express.Router();


loginRouter.post('/', (req, res) => {
   const name = req.body.name;
   const password = req.body.password;

   const lastServerInit = require('../server').sessionTimestamp;

   const idJson = {
        "name":name,
        "password":password,
        "timestamp":lastServerInit
    };

    // console.log('timestamp in the json i signed the token with:'+idJson.timestamp);

    const accessToken = jwt.sign(idJson, process.env.AUTH_TOKEN_SECRET);
    // console.log(accessToken);
    res.status(200).json({
        "msg":"hola admin estimat, aqui tens el teu trokon",
        "accessToken":accessToken
    });
})

module.exports = loginRouter