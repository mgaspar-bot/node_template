import { Socket } from "socket.io";

var connectedUsers = require('./connectedUsers');

function newSocketHandler ( socket : Socket) {
        
    const newUsername = socket.handshake.query.username;
    if (newUsername instanceof Array || newUsername === undefined) return;

    const newUserObj = {username : newUsername, id: socket.id};
    
    socket.on("messageToServer", (message) => {
        console.log(message);
        socket.broadcast.emit("messageBroadcast", {msg : message, sender : newUsername })
    });

    // Add user that just connected to connectedUsers before broadcasting
    connectedUsers.push(newUserObj);
    socket.broadcast.emit("userList", connectedUsers);

    socket.on('disconnect', (reason) => {
        console.log(`${newUsername} left`);

        let index = connectedUsers.findIndex((element : userObj) => element.id === socket.id);
        connectedUsers = connectedUsers.splice(index, 1);
        socket.broadcast.emit("userList", connectedUsers);
    });
}