import { Router } from "express";

const express = require('express');
const router : Router = express.Router();
const loginGetController = require('../controllers/loginGetController')
const loginPostController = require('../controllers/loginPostController')


router.get('/', loginGetController);
router.post('/', loginPostController);


module.exports = router;

