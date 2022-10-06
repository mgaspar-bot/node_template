const db = require('../db_connection/db');
const Datatypes = require('sequelize').DataTypes;


const Jugador = db.define('Jugador', {
    nom: {
        type: Datatypes.STRING,
        defaultValue:'Anonim'
    },
    gamesPlayed: {
        type: Datatypes.INTEGER,
        defaultValue:0,
        allowNull:false
    },
    gamesWon: {
        type: Datatypes.INTEGER,
        defaultValue:0,
        allowNull:false
    },
    winRate: {
        type: Datatypes.TINYINT,
        defaultValue:0,
        allowNull:false
    }
},{
    timestamps:false
});

module.exports = Jugador;