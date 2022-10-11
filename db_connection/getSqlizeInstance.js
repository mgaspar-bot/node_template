const Sequelize = require('sequelize').Sequelize;
require('dotenv').config();

const createdb = require('./createdb')


createdb();
const db =  new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME,process.env.DB_PASSWORD, {
        "dialect":"mysql",
        "host": "localhost",
        "logging":false
});

module.exports = db;

/*
No aconsegueixo ni a tiros que les linies de createdb s'acabin 
d'executar sempre abans del new Sequelize.

Si ho poso tot dins una funcio asincrona per poder fer await del
createdb(), el module exports no funciona i em salta error en 
altres requires ('db.define is not a function'/'db. -> cant access property of undefined')

Usant exports.db = db en comptes de module.exports passa exactament el mateix,
sembla que pq funcioni el exports, les linies de codi han d'estar 
a la scope "global" de la file o algo aixi...?

Tambe he intentat ordenar l'execucio fent que createdb crees la db
, despres exportes algun valor que aquesta file requires (amb la 
logica de que els requires segur que s'executen abans que el codi
 "principal") pero tampoc ho he aconseguit aixi.

 En tots els casos si la db no existeix, server.js ha d'inicialitzar-se
 dos cops per funcionar be
*/