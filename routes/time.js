const express = require('express');
const router = express.Router();
const cors = require('cors');
const {authMiddleware, cacheControl} = require('../Middlewares/timeMiddleware')

router.post('/', cors(), authMiddleware, cacheControl, (req, res) => {
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
