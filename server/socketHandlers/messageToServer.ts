import { Socket } from "socket.io";

function messageToServer (message: string, socket: Socket) : void {
    socket.broadcast.emit("messageBroadcast", {msg : message, sender : "pep" }) // Im adding the username here
    
}


module.exports = messageToServer;