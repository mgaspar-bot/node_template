import { Socket } from "socket.io";

export interface connectedUser {
    username : string;
    socketId : string;
}

export interface message {
    content : string;
    senderUsername : string;
}