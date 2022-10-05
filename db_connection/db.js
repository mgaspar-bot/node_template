const Sequelize = require('sequelize').Sequelize;

const db = new Sequelize('daus1','daus', 'dguest', {
    host: "localhost",
    dialect:"mysql",
    logging: console.log
});
module.exports = db;