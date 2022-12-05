export interface connectedUser {
    username : string,
    userId: number,
    socketId : string,
    inRoom : room
}

export interface message {
    content : string,
    username : string,
    userId : number,
    roomname : string,
    roomId : number,
    display?: string
}
// "ids" are for the db, and "names" are to display in frontend

export interface room {
    roomname : string,
    roomId : number
}
