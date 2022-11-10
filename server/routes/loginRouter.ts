import { Router } from "express";
const express = require('express');
const router: Router = express.Router();

const loginGetController = require('../Controllers/loginGetController')

router.get('/', loginGetController);






module.exports = router;