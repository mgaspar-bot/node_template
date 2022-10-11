const db = require('../db_connection/getSqlizeInstance');
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
module.exports = Partida;
