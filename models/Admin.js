const db = require('../db_connection/getSqlizeInstance');
const Datatypes = require('sequelize').DataTypes;

const Admin = db.define('Admin', {
    name: {
        type: Datatypes.STRING,
        allowNull:false,
        defaultValue:"admin",
        unique:true  
    },
    password: {
        type: Datatypes.STRING,
        allowNull:false,
        defaultValue:"admin"
    }
},{
    timestamps:false
});

module.exports = Admin;