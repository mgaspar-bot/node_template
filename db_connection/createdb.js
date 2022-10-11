const mysql = require('mysql2');
require('dotenv').config();

function createdb () {

    const connection = mysql.createConnection({ //Això es una mica com entrar a la consola de mysql però des de node
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host:"localhost"
    });
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    connection.end();
}


module.exports = createdb
