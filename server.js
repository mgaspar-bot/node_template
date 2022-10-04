const Sequelize = require('sequelize').Sequelize;
const express = require('express');

const db = new Sequelize('daus1','daus', 'dguest', {
    host: "localhost",
    dialect:"mysql",
    logging: true
});

(async function () {
    try {
        await db.authenticate();
        console.log('db online');
    } catch (error) {
        console.log(error);
        throw error;
    }
})();




const app = express();

app.listen(3000, () => console.log('server escoltant al port 3000'));



