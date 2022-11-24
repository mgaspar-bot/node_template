import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

import { ghostMessagesArray } from './ghostMessagesArray';
import { message, connectedUser, room } from '../shared/interfaces'



@Component({
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
    username = '';

    userId !: number;

    openChatRoom: room = { roomname: "Common Room", roomId: 1 }

    availableRooms !: room[];

    messagesList: message[] = ghostMessagesArray;

    writingMessage = '';

    socket !: Socket;
    // el !: es com dir-li al compilador "ara mateix es undefined, pero en quant la utilitzi sera un socket, jurat"

    connectedUsers !: connectedUser[];


    constructor(private router: Router, private http: HttpClient) { }

    sendMessage(): void {
        if (this.writingMessage.length === 0) return;
        if (!this.userId) return; // sending a message with userId NaN or undefined would crash the server through a db error
        let messageToSend: message = {
            content: this.writingMessage,
            username: this.username,
            userId: this.userId,
            display: 'mine',
            roomname: this.openChatRoom.roomname,
            roomId: this.openChatRoom.roomId
        };
        // Push message to our list 
        this.messagesList.push(messageToSend);
        // Send it to server so it broadcasts it
        this.socket.emit('messageToServer', messageToSend);
        // Clear input box
        this.writingMessage = '';
        // Scroll to message
        setTimeout(() => {
            let convDiv = document.getElementById("conversation");
            if (convDiv !== null) {
                convDiv.scrollTop = convDiv.scrollHeight;
            }
        }); // without the setTimeout, scrolling went to the penultim missatge, because it happened before the divs properties were actualized        
    }

    loadRoom(newActiveRoom: room): void {
        this.openChatRoom = newActiveRoom;
        // we start by popping all rendered messages until only the invisible ones are left
        while (this.messagesList.length > 8) {
            this.messagesList.pop(); // hi ha una forma millor de fer aixo? Amb una simple assignacio no funcionava
        }
        // ask for the room's messages from db, and also roomId
        this.http.get(`http://localhost:3000/messages?roomId=${this.openChatRoom.roomId}`)
            .subscribe({
                next: (response: any) => {
                    console.log(response.messagesInRoom);
                    if (response.messagesInRoom.length === 0) return;
                    for (let message1 of response.messagesInRoom) {
                        if (message1.userId === this.userId) {
                            message1["display"] = "mine";
                        }
                        this.messagesList.push(message1);
                    }

                },
                error: (err: any) => {
                    console.log(err);
                    console.log(`error message from backend (loadRoom): ${err.msg}`);
                }
            });
    }

    createRoom() {
        // demana al user el nom de la room a crear per prompt
        let newRoomname = prompt('Com es diu la nova sala que vols crear?');
        if (newRoomname === null || newRoomname.length === 0) return;
        // fes una http post request a un endpoint /rooms que la inserti a la db
        this.http.post(`http://localhost:3000/rooms`, {
            newRoomname: newRoomname
        },
            { observe: "body" })
            .subscribe({
                next: (res: any) => {
                    this.socket.emit('newRoom', res.newRoom);
                },          //  
                error: (err: any) => { // si falla, mostra el error per alert i ja esta
                    window.alert(err.msg);
                },
                complete: () => {
                    // setTimeout( () => { // posem el setTimeout pq el server emetra un event 'userList" despres de rebre el nostre 'newRoom', volem que aquest codi s'executi despres del handler de 'userList'
                    //     this.loadRoom()
                    // });
                } // si tot ha anat be, carrega la nova room
            });

    }

    ngOnInit(): void {
        // Set username
        if (sessionStorage['username'] === undefined) this.router.navigate(['']); // If you had no username in sessionStorage is because it wasn't set in login or signin
        this.username = sessionStorage['username'];
        // Initialize availableRooms with only the Common Room, it'll get actualized later when we receive roomList events
        this.availableRooms = [this.openChatRoom];
        // Connect socket
        this.socket = io(`http://localhost:3000?username=${this.username}`);
        // Load Common Room
        this.loadRoom(this.openChatRoom);
        // Set up event handler for incoming messages
        this.socket.on("messageBroadcast", (message: message): void => {
            if (message.roomId !== this.openChatRoom.roomId) return;
            this.messagesList.push(message);
            setTimeout(() => {
                let convDiv = document.getElementById("conversation"); // would be better to have a "new unread messages" popup
                if (convDiv !== null) {
                    convDiv.scrollTop = convDiv.scrollHeight;
                }
            });
        });
        // Set up event handler for new users connecting or disconecting
        this.socket.on('userList', (connectedUsers: connectedUser[]) => {
            this.connectedUsers = connectedUsers;
        });
        // get my id in db and put it here, but only first time i receive userlist
        this.socket.once('userList', (connectedUsers: connectedUser[]) => {
            let meInList = connectedUsers.find((user) => user.socketId === this.socket.id);
            if (meInList !== undefined) {
                this.userId = meInList.userId;
                console.log(this.userId);
            } else {
                // here i should ask for my id in db again and make sure i can set it
            }
        });
        // set up event handler for when i need to disconnect because my user connected with a different socket
        this.socket.on('pleaseLeave', (socketId: string) => {
            if (socketId === this.socket.id) {
                this.socket.disconnect();
                this.router.navigate(['']);
            }
        });
        // We also need a handler for roomList events, to always have an actualized list of roomnames and roomIds
        this.socket.on('roomList', (roomList: room[]) => {
            console.log(`i received a roomList event: ${roomList}`);

            this.availableRooms = roomList;
        });
        // Listen to keypresses on message writing box and send them if "enter" is pressed
        let textArea = document.getElementById("textArea");
        textArea?.addEventListener?.("keyup", (keyboardevent) => {
            if (keyboardevent.key === "Enter") {
                this.sendMessage();
            }
        });
    }

    // I need to cleanup when component is destroyed
    ngOnDestroy(): void {
        this.socket.disconnect();
        sessionStorage.clear();
    }
}
