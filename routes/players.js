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
/*
Casos de Post:
    ·no hi ha header "username" => 400
    ·el username ja existeix => 403 forbidden, username taken
    ·el username ve buit => 201 (checkejar que s'ha afegit un "Anonim" a la db)
    ·el username és vàlid => 201 (donar un crusant al usuari) 
*/

router.get('/', async (req, res) => { //TODO afegir el percentatge d'exits
    try {    
        let all = await Jugador.findAll(); //torna una array amb objectes Jugador que tenen un munt de coses
        all = all.map((j) => j.dataValues); //les dades insertades a la db estan al camp "dataValues"
        res.status(200).send(all);
        //TODO es valid tornar-ho en format array al body com estic fent?
    }catch(error) {
        console.log('Select Query failed (get controller)');
        console.log(error.stack);
        res.sendStatus(500);
    }
    
})
/*
Casos de GET:
    Només n'hi ha un, ensenya'm tots els usuaris i winrates
*/

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
        const updated = await Jugador.update({//update torna una array amb el numero de rows afectades al index 0
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
/*
Casos de PUT:
    ·missing header => 400
    ·nom repetit => 403 forbidden
    ·nom buit => 200 totOk, nothing changed
    ·id no hi es a la db => 200 totOk, nothing changed
    ·nom ple i vàlid => 201, croissant
*/
module.exports = router;

