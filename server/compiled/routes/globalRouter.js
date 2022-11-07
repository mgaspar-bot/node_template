"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const loginRouter = require('./login');
router.use('/login', loginRouter);
module.exports = router;
//# sourceMappingURL=globalRouter.js.map