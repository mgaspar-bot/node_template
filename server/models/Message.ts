import { DataTypes, Sequelize } from "sequelize";


const sqlize: Sequelize = require('../db/getSequelizeInstance');

const Message = sqlize.define('Message', {
    content : {
        type: DataTypes.STRING,
        allowNull:false
    },

},{
    timestamps: true,
    updatedAt:false
})




module.exports = Message;