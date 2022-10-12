const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.post('/', (req, res) => {
   const name = req.body.name;
   const password = req.body.password;

   const idJson = {
        "name":name,
        "password":password
    }
    const accessToken = jwt.sign(idJson, process.env.AUTH_TOKEN_SECRET);
    // console.log(accessToken);
    res.status(200).json({
        "msg":"hola admin estimat, aqui tens el teu trokon",
        "accessToken":accessToken
    });
})

module.exports = router;