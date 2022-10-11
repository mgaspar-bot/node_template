const express = require('express');
const router = express.Router();

const { getPlaceController, getAllController } = require('../Controllers/rankingController');


router.get('/:place',getPlaceController);
/*
Casos Get w/l:
    ·invalid url param: 404 not found
    ·w/l param but no users: 200, msg no users
    ·w/l param: 200, json with winner or loser row
*/

router.get('/',getAllController);
/*
Casos Get "global":
    ·no users: 200, msg no users
    ·all good: 200, json with ranked array
*/


module.exports = router;