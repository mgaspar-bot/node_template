const express = require('express');
const router = express.Router();


const { postController, getController, deleteController } = require('../Controllers/gamesControllers');

router.post('/', postController);
/*
Casos post:
    Només hi ha un cas (pq assumeixes que el id es valid),
    tires i s'actualitzen les dues taules
    
    ·tires els daus: 201, json amb els resultats

    Caldria fer que el body tornes la teva row a Jugadors
    per veure aqui mateix que s'ha actualitzat be el winRate?
*/

router.get('/', getController)
/*
Casos get
    OJO amb el que tornes a matches!!
*/

router.delete('/', deleteController)

module.exports = router;

