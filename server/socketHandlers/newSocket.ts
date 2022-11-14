import { Socket } from "socket.io";

var connectedUsers = require('./connectedUsers');
const messageToServer = require('./messageToServer');

function newSocketHandler (socket : Socket) : void {
        
    const newUsername = socket.handshake.query.username;
    if (newUsername instanceof Array || newUsername === undefined) return;

    // Add user that just connected to connectedUsers and broadcast its connection
    const newUserObj = {username : newUsername, id: socket.id};
    connectedUsers.push(newUserObj);
    socket.broadcast.emit("userList", connectedUsers);
    
    socket.on("messageToServer", messageToServer);

    socket.on('disconnect', (reason) => {
        let index = connectedUsers.findIndex((element : userObj) => element.id === socket.id);
        connectedUsers = connectedUsers.splice(index, 1);
        socket.broadcast.emit("userList", connectedUsers);
    });
}