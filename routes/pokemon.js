const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const {validateNumberQuery, validateNumberURL} = require('../Middlewares/pokeMiddlewares');

router.get('/',validateNumberQuery, async (req, res) => {
    //Utilizing the req.query object matches data loaded from the client side in a query conditional
    let dexNumber = req.query.id;
    var pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
    pokemon = await pokemon.json(); //la funcio json extreu un json amb les dades "interessants" del pokemon en comptes d'una response sencera i "crua" de la API amb headers, body i tot de coses
    let weight = `${pokemon.weight / 10} kg`; 
    let height = `${pokemon.height / 10} m`;
    res.status(200).json({ //TODO si li poses un numero de pokemon que no existeix et carregues tot el server
        "dexNumber":pokemon.id,
        "name":pokemon.name,
        "height":height,
        "weight":weight
    });
});

router.get('/:id', validateNumberURL,  async (req, res) => {
    //The req.params object captures data based on the parameter specified in the URL.
    let dexNumber = req.params.id;
    var pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
    pokemon = await pokemon.json(); //la funcio json extreu un json amb les dades "interessants" del pokemon en comptes d'una response sencera i "crua" de la API amb headers, body i tot de coses
    let weight = `${pokemon.weight / 10} kg`; 
    let height = `${pokemon.height / 10} m`;
    res.status(200).json({ //TODO si li poses un numero de pokemon que no existeix et carregues tot el server
        "dexNumber":pokemon.id,
        "name":pokemon.name,
        "height":height,
        "weight":weight
    });
});

module.exports = router;