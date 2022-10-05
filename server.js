const Sequelize = require('sequelize').Sequelize;
const express = require('express');
const db = require('./db_connection/db').db; //TODO canviar aquest export tot raro

(async function () {
    try {
        await db.authenticate();
        console.log('db online');
    } catch (error) {
        console.log(error);
        throw error;
    }
})(); //Aixo checkeja si la db esta conectada crec

const {Jugador} = require('./models/Jugador');
const {Partida} = require('./models/Partida');
Partida.belongsTo(Jugador);
Jugador.hasMany(Partida);

Partida.describe().then((tableData) => console.log(tableData));

//Importem els models??

const app = express();
db.sync().then(()=> {
    app.listen(3000, () => console.log('server escoltant al port 3000'));
})
//Si has pogut sincronitzar-te (crear les taules corresponents als models), aixeca el servidor
.catch(() => console.log('Couldnt sync with db'));


