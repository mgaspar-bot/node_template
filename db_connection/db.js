const Sequelize = require('sequelize').Sequelize;
require('dotenv').config();
require('./create')



var db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME,process.env.DB_PASSWORD, {
    "dialect":"mysql",
    "host": "localhost",
    "logging":console.log
})

module.exports = db;