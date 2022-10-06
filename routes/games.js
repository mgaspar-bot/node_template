const express = require('express');
const router = express.Router();

const Partida = require('../models/Partida');
const tirarDaus = require('../utils/tirarDaus');

router.post('/', async (req, res) => {
    const idReceived = req.idRebut; //Si definim el :id a la ruta global del endpoint, no hi podem accedir des d'aqui
    
    const tirada = tirarDaus();
    try {
        await Partida.upsert({ //ojo pq com que no valides ids aqui, pots acabar introduint JugadorId nulls a la db
            dau1:tirada[0],
            dau2:tirada[1],
            JugadorId:idReceived
        });
        res.status(201).json({
            "msg":"result successfully stored",
            "dau1":tirada[0],
            "dau2":tirada[1]
        });
    } catch (error) {
        res.status(502).json({
            "msg":"insert query failed (games POST controller)"
        })
    }
})

router.get('/', async (req, res) => {
    var idReceived = req.idRebut; //Ojo pq /:id est`à definit al router "global" del endpoint, a routes.js
    
    var matches;
    try {
        matches = await Partida.findAll({
            where: {
                JugadorId: idReceived
            }
        });     
        const allMatches = {
            "id":idReceived,
            "partides": matches
        }
        res.status(200).send(allMatches);   

    } catch (error) {
        res.status(502).json({
            "msg":"Select query failed (get Games controller)"
        })
        return;
    }
    
})

module.exports = router;

