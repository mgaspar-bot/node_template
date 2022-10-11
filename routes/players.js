const express = require('express');
const router = express.Router();

const validateNom = require('../Middlewares/validateNom')
const checkUsernameBody = require('../Middlewares/checkUsernameBody');
const { getController, postController, putController } = require('../Controllers/playersControllers');

router.post('/',checkUsernameBody, validateNom, postController)
/*
Casos de Post:
    ·no hi ha camp "username" al body => 400
    ·el username ja existeix => 403 forbidden, username taken
    ·el username ve buit => 201 (checkejar que s'ha afegit un "Anonim" a la db)
    ·el username és vàlid => 201 (donar un crusant al usuari) 
*/

router.get('/', getController)
/*
Casos de GET:
    Només n'hi ha un, ensenya'm tots els usuaris i winrates
*/

//No cal validar el id pq el update no falla si no hi es, simplement no canvia res
router.put('/:id',checkUsernameBody, validateNom, putController)
/*
Casos de PUT:
    ·missing header => 400
    ·nom repetit => 403 forbidden
    ·nom buit => 200 totOk, nothing changed
    ·id no hi es a la db => 200 totOk, nothing changed
    ·nom ple i vàlid => 201, croissant
*/
module.exports = router;

