import { Router } from "express";

const express = require('express');
const router : Router = express.Router();
const signinPostController = require('../controllers/loginPostController')


router.post('/', signinPostController);


module.exports = router;

