const { Jugador } = require('./Jugador');
const db = require('../db_connection/db').db;
const Datatypes = require('sequelize').DataTypes;

const Partida = db.define('Partida', {
    dau1: {
        type: Datatypes.INTEGER,
        allowNull:false
        //Aqui podira posr un check entre 1 i 6
    },
    dau2: {
        type: Datatypes.INTEGER,
        allowNull:false
    }
});

exports.Partida = Partida;