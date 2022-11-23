import { Socket } from 'socket.io'
import {Model, ModelStatic, Sequelize} from 'sequelize';

import { connectedUser, message, room } from './interfaces';
const User : ModelStatic<Model> = require('./models/User'); //No tinc gaire ide de que son aquests types, pero els objectes que exporto passen el typecheck del compilador i aqui tinc intellisense amb els metodes que vull aixi que deu estar be
const Message : ModelStatic<Model> = require('./models/Message');
const Room : ModelStatic<Model> = require('./models/Room');


var connectedUsers : connectedUser[] = [];
var availableRooms : room[] = [];

async function newSocketHandler (socket : Socket) {
    console.log(`Someone connected through a socket`);
    console.log(`See, i have their id here: ${socket.id}`);
    
    const usernameConnected = socket.handshake.query.username;
    let userId : any = await User.findOne({ // this should never fail, i have already confirmed you are registered
        where : {
            username : usernameConnected
        }
    });
    userId = Number(userId?.id);
    if (usernameConnected instanceof Array || usernameConnected === undefined) return;
    console.log(usernameConnected);
    
    // If the same username is connecting again, i'm gonna call security before proceeding
    let index = connectedUsers.findIndex((userInList : connectedUser) => userInList.username === usernameConnected)
    if (index !== -1) {
        socket.broadcast.emit("pleaseLeave", connectedUsers[index].socketId);
        // I emit this event because i don't know how to recover a different socket and disconnect it from here
        // apparently makes no sense to store the "socket object" in the connectedUsers array
    }
                                                                
    // Add user that just connected to connectedUsers and broadcast actualized list
    connectedUsers.push({"username":usernameConnected, "socketId":socket.id, userId:userId});
    socket.broadcast.emit("userList", connectedUsers);
    socket.emit("userList", connectedUsers);
    console.log(connectedUsers);

    // tambe enviem al front una llista amb totes les sales obertes
    let qresult = await Room.findAll();
    availableRooms = qresult.map((result) => {
        return {
            roomname : result.dataValues.roomname,
            roomId : result.dataValues.id
        }
    });
    socket.emit('roomsList', availableRooms);  
    
    // handler per quan ens arribi un missatge d'un user
    socket.on("messageToServer", (message : message) => {
        console.log(message);
        socket.broadcast.emit("messageBroadcast", message);
        Message.upsert({
            content : message.content,
            userId : message.userId, 
            roomId : message.roomId 
        }); // no cal que fem await d'aquesta crida
    });


    socket.on('disconnect', (reason) => {
        console.log(`${usernameConnected} left`);

        let index = connectedUsers.findIndex((element) => element.socketId === socket.id);
        // console.log(`index i found on disconnect: ${index}`);
        connectedUsers.splice(index, 1);
        socket.broadcast.emit("userList", connectedUsers);
    });
}
module.exports = newSocketHandler;