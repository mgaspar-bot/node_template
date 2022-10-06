const db = require('../db_connection/db');
const Datatypes = require('sequelize').DataTypes;


const Jugador = db.define('Jugador', {
    nom: {
        type: Datatypes.STRING,
        defaultValue:'Anonim'
    }
},{
    timestamps:false
});

module.exports = Jugador;