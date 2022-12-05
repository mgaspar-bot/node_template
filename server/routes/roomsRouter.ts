import { Router } from "express";
const express = require('express');
const router: Router = express.Router();

const roomsPostController = require('../Controllers/roomsPostController')

router.post('/', roomsPostController);

module.exports = router;