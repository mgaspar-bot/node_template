const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', (req, res) => {
    const quiEts = req.body.user;
    if (quiEts === "admin"){
        const token = jwt.sign(quiEts,process.env.ACCES_SECRET);
    
        res.status(200).json({
            "accesToken":token
        });
        return;
    }
    res.status(401).json({
        msg:"bad header"
    })
})


module.exports = router;