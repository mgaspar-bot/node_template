"use strict";
const mysql = require('mysql2');
require('dotenv').config();
function createdb() {
    const connection = mysql.createConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: "localhost"
    });
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    connection.end();
}
module.exports = createdb;
//# sourceMappingURL=createdb.js.map