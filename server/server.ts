import {Express, Request, Response} from 'express' //import types
import {Model, ModelStatic, Sequelize} from 'sequelize';
// import { execSync } from 'child_process';

const cors = require('cors') //import libraries and shit
const express = require('express')
const app : Express = express()
const http = require('http').createServer(app) //create http server with express as function manager for the routes
const io = require('socket.io')(http, {
    cors: {
        origin : '*'
    }
})

const globalRouter = require('./routes/globalRouter');
const sqlize : Sequelize = require('./db/getSequelizeInstance');
const createdb = require('./db/createdb');
const newSocketHandler = require('./newSocketHandler');
import { authMiddlewareSocket } from './Middlewares/authMiddleware';

const User : ModelStatic<Model> = require('./models/User'); //No tinc gaire ide de que son aquests types, pero els objectes que exporto passen el typecheck del compilador i aqui tinc intellisense amb els metodes que vull aixi que deu estar be
const Message : ModelStatic<Model> = require('./models/Message');
const Room : ModelStatic<Model> = require('./models/Room');
Message.belongsTo(User, {
    foreignKey: {
        name : "userId",
        allowNull : false
    }
});
Message.belongsTo(Room, {
    foreignKey : {
        name : "roomId",
        allowNull: false
    }
});
//Tot aquest bloc el podria colocar a models no?.

 // Estaria be fer una funcio que checkejes les variables d'entorn abans de començar per no haver de fer mil checks despres
async function server () {
    await sqlize.authenticate();
    await sqlize.sync({"force": true});
    await Room.upsert({}); // un insert buit per tenir una sala "common room" i poder provar coses

    io.use(authMiddlewareSocket);
    io.on('connection', newSocketHandler);

    app.use(cors());
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

    app.use('/',globalRouter);
    app.get('app', express.static('../client/dist/client'));
    app.use('/', (req: Request, res: Response) => {
        res.status(404).send({
            "msg":"this route does not exist"
        });
    });

    http.listen(3000, () => console.log(`Server escoltant al port 3000`));
}

// execSync('net start mysql80'); // run script as admin!!
try {
    createdb();
} catch (error) {
    console.log(error);
    console.log('\n\n\n\n\n\n');
    console.log(`
        Tens un arxiu .env amb els parametres adequats? (checkeja el README del repo per saber quins son els parametres adequats)

        Has ences el servidor local de mysql?
    `);
}

setTimeout(() => server());

