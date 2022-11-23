export interface message {
    content : string;
    username : string;
    userId : number;
    roomname : string;
    roomId : number;
    display?: string; // Aquesta propietat l'afegeixo aqui al front per mostrar els meus missatges a la dreta
}

export interface connectedUser {
    username : string;
    userId: number;
    socketId : string;
}