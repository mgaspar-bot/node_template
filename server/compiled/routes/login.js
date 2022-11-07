"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    //get id and password from req
    console.log(req.body.username, req.body.password);
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'admin' && password === 'admin') {
        res.status(200).send({
            "msg": "welcome admin"
        });
    }
    else {
        res.status(401).send({
            "msg": "incorrect username or password"
        });
    }
    //check with db
    //return token if 200, 401 unauthorized if not
});
module.exports = router;
//# sourceMappingURL=login.js.map