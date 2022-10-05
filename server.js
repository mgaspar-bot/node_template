const Sequelize = require('sequelize').Sequelize;
const express = require('express');

const db = require('./db_connection/db'); 
require('./models/Jugador');
require('./models/Partida');//Fem nomes els requires pq s'executin els db.define
const playerRouter = require('./routes/players');



const app = express();
(async function () {
    try {
        await db.authenticate(); //tenim connexió amb db
        await db.sync(); //db té les taules que esperem
        console.log('db online');

        app.use('/players', playerRouter)
        app.listen(3000, () => console.log(`Server escoltant al port 3000`))
    } catch (error) {
        console.log(error.message);
        console.log(`Ha fallat la sincronització amb db`);
    }
})();

