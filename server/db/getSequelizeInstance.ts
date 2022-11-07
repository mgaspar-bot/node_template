const Sequelize = require('sequelize').Sequelize;
require('dotenv').config();

const db =  new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME,process.env.DB_PASSWORD, {
        "dialect":"mysql",
        "host": "localhost",
        "logging":false
});

module.exports = db;