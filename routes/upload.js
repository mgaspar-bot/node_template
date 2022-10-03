const express = require('express');
const controller = require('../Middlewares/uploadMiddleware');
const router = express.Router();

router.post('/',controller.uploadMiddleware, (req, res) => {
    res.status(201).json({"totOk?":"totOk"})
});

module.exports = router;