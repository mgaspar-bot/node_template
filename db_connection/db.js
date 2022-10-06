const Sequelize = require('sequelize').Sequelize;

const db = new Sequelize('daus1','daus', 'dguest', {
    host: "localhost",
    dialect:"mysql",
    logging: false //Posare console.log quan calgui pero es que s'omple la consola de brossa
});
module.exports = db;