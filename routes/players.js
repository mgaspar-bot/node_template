const express = require('express');
const router = express.Router();

const Jugador = require('../models/Jugador').Jugador
const validateNom = require('../Middlewares/validateNom')
const checkUsernameHeader = require('../Middlewares/checkUsernameHeader')

router.post('/',checkUsernameHeader,validateNom, async (req, res) => {
    const newUsername = req.headers.username;

    try {
        await Jugador.upsert({
        nom: newUsername
        });
        res.status(201).json({
            "msg":"user created"
        })
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({
            "msg":"Insert into db failed"
        })
    }
})

router.get('/', async (req, res) => { //TODO afegir el percentatge d'exits
    try {    
        let all = await Jugador.findAll(); //torna una array amb objectes Jugador que tenen un munt de coses
        all = all.map((j) => j.dataValues); //les dades insertades a la db estan al camp "dataValues"
        res.status(200).send(all);
    }catch(error) {
        console.log('Select Query failed (get controller)');
        console.log(error.stack);
        res.sendStatus(500);
    }
    
})
//No cal validar el id pq el update no falla si no hi es, simplement no canvia res
router.put('/:id',checkUsernameHeader, validateNom, async (req, res) => {
    const idReceived = req.params.id;  //No cal pasar-lo a number, espera una string
    const newUsername = req.headers.username; //als headers no s'hi poden posar MAJUSCULES!!
    
    if (newUsername === "Anonim"){
        res.status(200).json({
            "msg":"empty username, nothing changed"
        });
        return;
    }

    try {
        const updated = await Jugador.update({
            nom:newUsername
        },
        {
            where: { id:idReceived }
        });
        if(updated[0] === 0) {
            res.status(200).json({
                "msg":"nothing changed"
            })
        }else {
            res.status(201).json({
                "msg":"name succesfully updated"
            })
        }
    }catch(error){
        res.status(500).json({
            "msg":"update query failed (put controller)"
        })
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