import { Router, Request, Response } from "express";
const express = require('express');
const router: Router = express.Router();

const loginGetController = require('../controllers/loginGetController')

router.get('/', loginGetController);






module.exports = router;