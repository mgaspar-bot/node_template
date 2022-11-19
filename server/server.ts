import {Express, Request, Response} from 'express' //import types
import { Socket } from 'socket.io'
import {Model, ModelStatic, Sequelize} from 'sequelize';
import { execSync } from 'child_process';

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
import { connectedUser, message } from './interfaces';

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

/*
// function checkEnv(): boolean {
//     require('dotenv').config();
//     if (process.env.DB_USERNAME 
//     && process.env.DB_PASSWORD 
//     && process.env.DB_NAME 
//     && process.env.AUTH_SECRET){
//         global.DB_USERNAME : string = process.env.DB_USERNAME;

        
//     }
 // Estaria be fer una funcio que checkejes les variables d'entorn abans de començar per no haver de fer mil checks despres
// }*/


async function server () {
    await sqlize.authenticate();
    await sqlize.sync({"force": true});
    
    var connectedUsers : connectedUser[] = []; // should this be a singleton? do i need to think about race conditions?
    //for now it just tells me it works
    io.on('connection', (socket : Socket) => {
        // Can i somehow force the socket id to be equal to the userId in db?
        console.log(`Someone connected through a socket`);
        console.log(`See, i have their id here: ${socket.id}`);
        
        const usernameConnected = socket.handshake.query.username;
        if (usernameConnected instanceof Array || usernameConnected === undefined) return;
        console.log(usernameConnected);
        
        // Add user that just connected to connectedUsers and broadcast actualized list
        connectedUsers.push({"username" : usernameConnected, "socketId" : socket.id});
        socket.broadcast.emit("userList", connectedUsers);
        socket.emit("userList", connectedUsers);
        
        socket.on("messageToServer", (message : message) => { // frontend message also needs to implement this interface!!
            console.log(message);
            socket.broadcast.emit("messageBroadcast", message);
        });


        socket.on('disconnect', (reason) => {
            console.log(`${usernameConnected} left`);

            let index = connectedUsers.findIndex((element) => element.socketId === socket.id);
            connectedUsers = connectedUsers.splice(index, 1);
            socket.broadcast.emit("userList", connectedUsers);
        });
    });

    //middlewares ill need: cors to share resources from a different port and urlencoded to acces urlencoded body of requests
    app.use(cors());
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

    //all routes should go here
    app.use('/',globalRouter);
    app.use('/', (req: Request, res: Response) => {
        res.status(404).send({
            "msg":"this route does not exist"
        });
    });

    http.listen(3000, () => console.log(`Server escoltant al port 3000`));
}

// execSync('net start mysql80'); // run script as admin!!
createdb();
setTimeout(() => server());

