const express = require('express');
const router = express.Router();

const Jugador = require('../models/Jugador').Jugador
const validateNom = require('../Middlewares/validateNom')


router.post('/',validateNom, async (req, res) => { //TODO afegir middleware per validar usernames unics
    const username = req.headers.username;
    try {
        if (username === "") {
            await Jugador.upsert({}); //Amb el upsert buit mysql inserta el valor "Anonim"
        }else {
            await Jugador.upsert({
            nom: username
            });
        }
        res.sendStatus(201);
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            "msg":"Insert into db failed"
        })
    }
})

router.get('/', async (req, res) => { 
    try {    
        let all = await Jugador.findAll(); //torna una array amb objectes Jugador que tenen un munt de coses
        all = all.map((j) => j.dataValues); //les dades insertades a la db estan al camp "dataValues"
        res.status(200).send(all);
    }catch(error) {
        console.log('Select Query failed');
        console.log(error.stack);
        res.sendStatus(500);
    }
    
})

router.put('/:id', async (req, res) => {
    try {
        Jugador.findOne({
            
        })
    }catch(error){

    }
})

module.exports = router;


/*
POST /players: crea un jugador/a.

PUT /players/{id}: modifica el nom del jugador/a.

GET /players: retorna el llistat de tots els 
    jugadors/es del sistema amb el seu percentatge
     d’èxits.

     Com s'ha de tornar el llistat de GET??
*/