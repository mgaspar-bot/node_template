const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const {validateNumberQuery, validateNumberURL} = require('../Middlewares/pokeMiddlewares');

router.get('/',validateNumberQuery, async (req, res) => {
    let dexNumber = req.query.id;
    var pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
    pokemon = await pokemon.json(); 
    let weight = `${pokemon.weight / 10} kg`; 
    let height = `${pokemon.height / 10} m`;
    res.status(200).json({
        "dexNumber":pokemon.id,
        "name":pokemon.name,
        "height":height,
        "weight":weight
    });
});

router.get('/:id', validateNumberURL,  async (req, res) => {
    let dexNumber = req.params.id;
    var pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
    pokemon = await pokemon.json(); 
    let weight = `${pokemon.weight / 10} kg`; 
    let height = `${pokemon.height / 10} m`;
    res.status(200).json({
        "dexNumber":pokemon.id,
        "name":pokemon.name,
        "height":height,
        "weight":weight
    });
});

module.exports = router;