import { Socket } from 'socket.io'
import {Model, ModelStatic, Sequelize} from 'sequelize';

import { connectedUser, message, room } from './interfaces';
const User : ModelStatic<Model> = require('./models/User'); //No tinc gaire ide de que son aquests types, pero els objectes que exporto passen el typecheck del compilador i aqui tinc intellisense amb els metodes que vull aixi que deu estar be
const Message : ModelStatic<Model> = require('./models/Message');
const Room : ModelStatic<Model> = require('./models/Room');


var connectedUsers : connectedUser[] = [];
var availableRooms : room[] = [{roomId : 1, roomname: "Common Room"}];

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
    }
                                                                
    // Add user that just connected to connectedUsers and broadcast actualized list
    connectedUsers.push({"username":usernameConnected, "socketId":socket.id, userId:userId, inRoom:  {roomId : 1, roomname: "Common Room"} });
    socket.broadcast.emit("userList", connectedUsers);
    socket.emit("userList", connectedUsers);
    console.log(connectedUsers);

    // tambe enviem al front una llista amb totes les sales obertes
    let qresult = await Room.findAll();
    availableRooms = qresult.map((result) => {
        return {
            roomname : result.dataValues.roomname,
            roomId : result.dataValues.id
        } // esta be que hagi d'esperar a la db aqui?
    });
    socket.emit('roomList', availableRooms); 

    // handler per quan un usuari ha creat una room
    socket.on('newRoom', (newRoom : room) => {
        console.log('i received newRoom event');
        console.log(newRoom);
        availableRooms.push(newRoom);
        socket.broadcast.emit('roomList', availableRooms);
        socket.emit('roomList', availableRooms);
    });
    
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

    // quan aquest usuari canviï de sala, actualitzem la nostra connectedUsers i broadcastejem el canvi
    socket.on('roomChange', (newRoom : room) => {
        connectedUsers = connectedUsers.map( (user) => {
            if( user.socketId === socket.id) {
                user.inRoom = newRoom;
            }
            return user;
        });
        socket.broadcast.emit('userList', connectedUsers);
        socket.emit('userList', connectedUsers);
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