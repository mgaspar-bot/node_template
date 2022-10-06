const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
            "nom":"Marc",
            "edat":"27",
            "url":`${req.protocol}://${req.headers.host}${req.originalUrl}`,
        });
});

module.exports = router;