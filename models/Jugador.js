const { Partida } = require('./Partida');
const db = require('../db_connection/db').db;
const Datatypes = require('sequelize').DataTypes;

const Jugador = db.define('Jugador', {
    nom: {
        type: Datatypes.STRING,
        defaultValue:'Anonim'
    }
});

exports.Jugador = Jugador;