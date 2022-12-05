import { Router } from "express";

const express = require('express')
const router : Router = express.Router();
const getMessagesController = require('../Controllers/getMessagesController')

router.get('/', getMessagesController);


module.exports = router;



