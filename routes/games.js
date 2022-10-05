const express = require('express');
const validateId = require('../Middlewares/validateId');
const router = express.Router();

router.post('/:id',validateId, (req, res) => {
    
})

module.exports = router;