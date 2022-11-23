import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';

import { ghostMessagesArray } from './ghostMessagesArray';
import { message, connectedUser } from '../shared/interfaces'
import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';


@Component({
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
    username = '';

    userId !: number;

    openChatRoomName = 'Common Room';

    openChatRoomId = 1;

    messagesList : message[] = ghostMessagesArray;

    writingMessage='';

    socket !: Socket;
    // el !: es com dir-li al compilador "ara mateix es undefined, pero en quant la utilitzi sera un socket, jurat"

    connectedUsers !: connectedUser[];

    availableRooms : string[] = ['Common Room'];

    constructor(private router : Router, private http : HttpClient) { }
    
    sendMessage() : void {    
        if (this.writingMessage.length === 0) return;
        if (!this.userId) return;
        // Push message to our list  
        this.messagesList.push({content: this.writingMessage, username: this.username, userId:this.userId, display:'mine', roomname: "CommonRoom", roomId:0});
        // Send it to server so it broadcasts it
        this.socket.emit('messageToServer', {content: this.writingMessage, username: this.username, userId:this.userId, roomname: "CommonRoom", roomId:0});
        // Clear input box
        this.writingMessage = '';
        // Scroll to message
        setTimeout(()=>{
            let convDiv = document.getElementById("conversation");
            if (convDiv !== null) {
                convDiv.scrollTop = convDiv.scrollHeight;
            }
        }); // without the setTimeout, scrolling went to the penultim missatge, because it happened before the divs properties were actualized        
    }

    loadRoom(roomname = "Common Room") : void {
        // ask for the room's messages from db, and also roomId

        // put ghostMessages + room's messages in messagesList

    }
    
    ngOnInit(): void {
        // Set username
        this.username = sessionStorage['username'];
        // Connect socket
        this.socket = io(`http://localhost:3000?username=${this.username}`);

        // Set up event handler for incoming messages
        this.socket.on("messageBroadcast", (message) : void => {
            this.messagesList.push(message);
            setTimeout(()=>{
                let convDiv = document.getElementById("conversation"); // would be better to have a "new unread messages" popup
                if (convDiv !== null) {
                    convDiv.scrollTop = convDiv.scrollHeight;
                }
            });  
        });
        // Set up event handler for new users connecting or disconecting
        this.socket.on('userList', (connectedUsers : connectedUser[]) => {
            this.connectedUsers = connectedUsers;
        });
            // get my id in db and put it here, but only first time i receive userlist
        this.socket.once('userList',(connectedUsers : connectedUser[]) => {
            let meInList = connectedUsers.find((user) => user.socketId === this.socket.id);
            if (meInList !== undefined) {
                this.userId = meInList.userId;
                console.log(this.userId);
            } else {
                // here i should ask for my id in db again and make sure i can set it
            }
        });
        // set up event handler for when i need to disconnect because my user connected with a different socket
        this.socket.on('pleaseLeave', (socketId:string) => {
            if (socketId === this.socket.id) {
                this.socket.disconnect();
                this.router.navigate(['']);
            }
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
    ngOnDestroy() : void {
        this.socket.disconnect();
    }
}
