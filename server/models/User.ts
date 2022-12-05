import { Sequelize, DataTypes } from "sequelize";

const sqlize: Sequelize = require('../db/getSequelizeInstance');

const User = sqlize.define('User', {
    username : {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password : {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: true,
    updatedAt:false
})

module.exports = User;