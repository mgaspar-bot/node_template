// const Sequelize = require('sequelize').Sequelize;
const express = require('express');

const db = require('./db_connection/getSqlizeInstance') 
const Jugador = require('./models/Jugador');
const Partida = require('./models/Partida');
Partida.belongsTo(Jugador);
Jugador.hasMany(Partida); //Poso aqui la relació pq sino Jugador i Partida es requerien mutuament
const globalRouter = require('./routes/routes.js');

/*
Afegeix un endpoint /login que permeti accedir a un administrador amb usuari/ària i contrasenya 
i retorni un token i fes obligatòria l'autentificació per JWT en tots els accessos als URL del microservei,
 fent servir middlewares per validar al token.
*/

var errors = 0;
const app = express();
async function server () {
    try {
        await db.authenticate(); //tenim connexió amb db
        await db.sync({force: true}); //db té les taules que esperem
        console.log('db online');

        app.use(express.json());
        app.use(express.urlencoded({extended:true}));

        app.use(globalRouter);

        app.listen(3000, () => console.log(`Server escoltant al port 3000`))

    } catch (error) {
        errors++;
        console.log(error.message);
        console.log(`Ha fallat la sincronització amb db`);
        if (error.message.match(/Unknown database/) && errors < 2){ //Si trobes el error 'Uknown database' tornaho a provar, pero nomes un cop
            console.log('Ho tornem a intentar...');
            server();
        }
    }
};

server();

module.exports = server;