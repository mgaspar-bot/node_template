import { Component, OnInit, } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { ghostMessagesArray } from './ghostMessagesArray';

interface message {
    content : string;
    senderUsername : string;
    display?: string;
}

export interface connectedUser {
    username : string;
    socketId : string;
}

@Component({
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
    username = '';

    openChatRoomName = 'Common Room';
    // later, this property should change when you pick a different chatroom

    messagesList : message[] = ghostMessagesArray;

    writingMessage=''; // metode amb ngModel, aquesta propietat esta bound al interior del input de missatges

    socket !: Socket;
    // el !: es com dir-li al compilador "ara mateix es undefined, pero en quant la utilitzi sera un socket, jurat"

    connectedUsers !: connectedUser[];

    constructor() { }
    
    sendMessage() {    
        // Push message to our list  
        this.messagesList.push({content: this.writingMessage, senderUsername: this.username, display:'mine'});
        // Send it to server so it broadcasts it
        this.socket.emit('messageToServer', {content: this.writingMessage, senderUsername: this.username});
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
    
    ngOnInit(): void {
        // Set username
        this.username = `pep${Date.now() % 10000}` // how should i get the username? via http request? from the login component? 
        // Connect socket
        this.socket = io(`http://localhost:3000?username=${this.username}`);

        // Set up event handler for incoming messages
        this.socket.on("messageBroadcast", (message) : void => {
            this.messagesList.push(message);
        });

        // Set up event handler for new users connecting or disconecting
        this.socket.on('userList', (connectedUsers : connectedUser[]) => {
            console.log('i received a new userList event');
            this.connectedUsers = connectedUsers;
        });

        // Listen to keypresses on message writing box and send them if "enter" is pressed
        let textArea = document.getElementById("textArea");
        textArea?.addEventListener?.("keyup", (keyboardevent) => {
            if (keyboardevent.key === "Enter") {
                this.sendMessage();
            }
        })

    }

}
function getElementById(arg0: string) {
    throw new Error('Function not implemented.');
} // khè?
