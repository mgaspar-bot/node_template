import { Sequelize, DataTypes } from "sequelize";

const sqlize: Sequelize = require('../db/getSequelizeInstance');

const Group = sqlize.define('Group', {
    groupname : {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
},{
    timestamps: true,
    updatedAt:false
})

module.exports = Group;