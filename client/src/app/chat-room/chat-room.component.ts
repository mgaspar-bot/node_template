import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { ghostMessagesArray } from './ghostMessagesArray';

interface message {
    content : string;
    senderUsername : string;
    display?: string;
}

@Component({
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
    username = '';

    openChatRoomName = 'this is hardcoded';
    // later, this property should change when you pick a different chatroom

    messages : message[] = ghostMessagesArray;

    writingMessage=''; // metode amb ngModel, aquesta propietat esta bound al interior del input de missatges

    socket !: Socket;
    // el !: es com dir-li al compilador "ara mateix es undefined, pero en quant la utilitzi sera un socket, jurat"

    constructor() { }
    
    sendMessage() {    
        // Push message to our list  
        this.messages.push({content: this.writingMessage, senderUsername: this.username, display:'mine'});
        // Send it to server so it broadcasts it
        this.socket.emit('messageToServer', {content: this.writingMessage, senderUsername: this.username});
        // Clear input box
        this.writingMessage = '';
    }
    
    ngOnInit(): void {
        

        // Set username
        this.username = `pep${Date.now() % 10000}` // how should i get the username? via http request? from the login component? 
        // Connect socket
        this.socket = io(`http://localhost:3000?username=${this.username}`);
        // Set up event handler
        this.socket.on("messageBroadcast", (message) => {
            console.log('I got a message');
            this.messages.push(message);
            console.log(this.messages.length);
            scrollTo({
                top:0,
                behavior:'smooth'
            });
        });
    }

}
function getElementById(arg0: string) {
    throw new Error('Function not implemented.');
} // khè?
