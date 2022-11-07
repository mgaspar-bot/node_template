import {Express, Request, Response} from 'express' //import types
import { Socket } from 'socket.io'
import {Model, ModelStatic, Sequelize} from 'sequelize';

const cors = require('cors') //import libraries and shit
const express = require('express')
const app : Express = express()
const http = require('http').createServer(app) //create http server with express as function manager for the routes
const io = require('socket.io')(http, {
    cors: {
        origin : '*'
    }
})

const appRouter = require('./routes/globalRouter');
const sqlize : Sequelize = require('./db/getSequelizeInstance');
const createdb = require('./db/createdb');

const User : ModelStatic<Model> = require('./models/User'); //No tinc gaire ide de que son aquests types, pero els objectes que exporto passen el typecheck del compilador i aqui tinc intellisense amb els metodes que vull aixi que deu estar be
const Message : ModelStatic<Model> = require('./models/Message');
const Group : ModelStatic<Model> = require('./models/Group');
Message.belongsTo(User, {
    as:"sender",
    foreignKey: {
        allowNull:false
    }
});
Message.belongsTo(User, {
    as:"receiver"
});
Message.belongsTo(Group, {
    as:"groupreceiver"
});
User.belongsToMany(Group, {
    through:"User_in_Group"
});
Group.belongsToMany(User, { // despres quan vulgui afegir users a groups haure de pensar com, pq no tinc un model per "UserinGroup"
    through:"User_in_Group"
});
//Tot aquest bloc el podria colocar a models no?.

async function server () {
    await sqlize.authenticate();
    await sqlize.sync({"force": true});


    
    io.on('connection', (socket : Socket) => { //for now it just tells me it works
        console.log('Someone connected through a socket');
        console.log(`See, i have their id here: ${socket.id}`);
    });

    //middlewares ill need: cors to share resources from a different port and urlencoded to acces urlencoded body of requests
    app.use(cors());
    app.use(express.urlencoded({extended:true}));

    //all routes should go here
    app.use('/',appRouter);
    app.use('/', (req: Request, res: Response) => {
        req.body; // just so tsc doesnt complain
        res.status(404).send({
            "msg":"this route does not exist"
        })
    })

    http.listen(3000, () => console.log(`Server escoltant al port 3000`));
}

createdb();
setTimeout(() => server());

