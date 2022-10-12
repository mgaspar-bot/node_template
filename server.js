// const Sequelize = require('sequelize').Sequelize;
const express = require('express');

const db = require('./db_connection/getSqlizeInstance')
const Jugador = require('./models/Jugador');
const Partida = require('./models/Partida');
Partida.belongsTo(Jugador);
Jugador.hasMany(Partida); //Poso aqui la relació pq sino Jugador i Partida es requerien mutuament
const Admin = require('./models/Admin');
const globalRouter = require('./routes/global.js');
const adminLogin = require('./Middlewares/adminLogin');

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
        await Admin.upsert({})                                                      //Crea un Admin "admin admin1234" per poder fer login

        
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
        /*
        Aixi funciona encara que no s'hagi creat la db, pero esta una mica feo...
        */
    }
};

setTimeout(() =>{ server()} );
/*
El setTimeout es la manera que no passi per el if si la baser de dades no esta creada, aixi que la meva logica del que esta passant
es la següent:
    ·Al executar-se el require('./db_connection/getSqlizeInstance') js fa la crida a createdb() i genera la instaqncia de sequelize.
        la crida a createdb, amb la query CREATE DATABASE..., es queda a la "cua d'execució" per alguna rao
    
    ·Segueix la cadena de requires amb la instancia de sqlize creada i la query per crear la db a la "cua". Tot i que no existeix la
    db, la instancia de sqlize es valida, aixi que els seguents requires (els models de Jugador i Partida) s'executen bé.
        Segueix amb el require del enrutador, pero aquest ens es igual

    ·Quan s'han acabat els requires i s'executa el codi d'aquesta file, sqlize per fi se'n adona (al fer db.authenticate)
     que la instancia que ha estat utilitzant no esta connecta a una db, i em tira el error.  
     Al saltar el error, o en algun moment al voltant, la callStack es queda buida i per aixo s'executa el codi "a la cua", la 
     CREATE DATABASE... 
     Per això al passar per el if de 'ho tornem a intentar...' el segon cop ja existeix la db i ens hi podem sincronitzar i tot va bé
    
     També per això el setTimeout ho arrecla: envia la crida a server() "al final de la cua", abans s'executa el que hi havia a la cua
     (la query CREATE DATABASE) i quan fem db.authenticate trobem sempre una fantastica db a l'altre costat de la instancia de sqlize
*/


module.exports = server;