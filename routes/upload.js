const express = require('express');
const middles = require('../Middlewares/uploadMiddleware');
const router = express.Router();

router.post('/', middles.uploadMiddleware, (req, res) => {
    let status = (res.statusCode == 201) ? 'file uploaded' : 'nothing to upload';
    res.json({"status":status});    
});

module.exports = router;
