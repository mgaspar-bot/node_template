const mysql = require('mysql2'); //Llibreria del driver (?) de mysql
require('dotenv').config();

function create () {
    return new Promise((res, rej) => {
        try {
            const connection = mysql.createConnection({ //Això es una mica com entrar a la consola de mysql però des de node
                    user: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    host:"localhost"
                });
                connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
                res('Stuff');
        } catch (error) {
            console.log(error.message);
            rej('Error executing create db query')
        }    
    })
}

module.exports = create;
