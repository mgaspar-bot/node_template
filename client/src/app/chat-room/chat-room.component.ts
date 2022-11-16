import { Component, OnInit, OnChanges } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {NgModel} from '@angular/forms'
import { NonNullAssert } from '@angular/compiler';

@Component({
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnChanges {
    username = '';

    openChatRoomName = 'this is hardcoded';
    // later, this property should change when you pick a different chatroom

    messages : string[] = ['placeholder'];
    // this type anotation should be the message interface later

    writingMessage=''; // metode amb ngModel, aquesta propietat esta bound al interior del input de missatges

    socket !: Socket;
    // el !: es com dir-li al compilador "ara mateix es undefined, pero en quant la utilitzi sera un socket, jurat"

    constructor() { }

    getStringFromTextArea() : string {
        let m = document.getElementById("textArea");

        if (!(m instanceof HTMLInputElement)) return '';
        
        return m.value;
    }
    putNewMessageInSuperMessage(messageToSend : string) : void { // this is only until it works properly, to try the sockets server
        
    }
    sendMessage() {
        let msg = this.getStringFromTextArea();
        this.messages.push(msg);
        this.socket.emit("messageToServer", )
         // metode "a lo bruto"
         console.log(this.writingMessage);
         
        // this.messages.push(this.writingMessage);
    }
    ngOnChanges() {        
    }
    ngOnInit(): void {
        // Set username of connected user
        // Connect socket
        // Set up the messageBroadcast listener to listen to the server

        this.username = `pep${Date.now() % 10000}` // how should i get the username? via http request? from the login component? 

        this.socket = io(`http://localhost:3000?username=${this.username}`);

        this.socket.on("messageBroadcast", (message) => {
            console.log('I got a message');
        });
    }

}
function getElementById(arg0: string) {
    throw new Error('Function not implemented.');
} // khè?



/*
Al afegir missatges se'm renderitzen a sota de tot de la pagina, a sobre de la input box, com 
puc fer que es "recarregui" nomes el div de la conversation?? haig d'afegir un altre component?
*/