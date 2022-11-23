export interface connectedUser {
    username : string;
    userId: number;
    socketId : string;
}

export interface message {
    content : string;
    username : string;
    userId : number;
    roomname : string;
    roomId : number;
}
// "ids" are for the db, and "names" are to display in frontend
