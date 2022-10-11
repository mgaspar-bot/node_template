const Sequelize = require('sequelize').Sequelize;
require('dotenv').config();
const mysql = require('mysql2')

const connection = mysql.createConnection({ //Això es una mica com entrar a la consola de mysql però des de node
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:"localhost"
});
connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

const db =  new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME,process.env.DB_PASSWORD, {
        "dialect":"mysql",
        "host": "localhost",
        "logging":false
});

module.exports = db;