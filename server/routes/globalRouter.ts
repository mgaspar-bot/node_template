import { Router } from "express";
const express = require('express');
const router: Router = express.Router();

const loginRouter = require('./login');


router.use('/login', loginRouter )

module.exports = router;