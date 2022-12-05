import { Sequelize, DataTypes } from "sequelize";

const sqlize: Sequelize = require('../db/getSequelizeInstance');

const Room = sqlize.define('Room', {
    roomname : {
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue : "Common Room",
        unique:true
    }
},{
    timestamps: true,
    updatedAt:false
})

module.exports = Room;