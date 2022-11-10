import { Router } from "express";

const express = require('express');
const router : Router = express.Router();
const signinPostController = require('../Controllers/signinPostController')


router.post('/', signinPostController);


module.exports = router;

