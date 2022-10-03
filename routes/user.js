const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //Aqui aniria el codi del controlador
    res.send(
        {
            "nom":"Marc",
            "edat":"27",
            "url":req.originalUrl
        }
    );
});

module.exports = router;