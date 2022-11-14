import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor() { }
  connected : boolean = false;

  adminLogin() {
    const username : string = (document.getElementById(`login`) as HTMLInputElement)?.value
    const socket = io(`http://localhost:3000?username=${username}`);
    console.log(socket);
    if(socket) this.connected = true; else this.connected = false;
  }

  signinButton() : void {
    // POST request to /signin, store token
    // once we have token, GET request to / and change view to my messages
  }

  loginButton() : void {
    // GET request to /login, store token
    // once we have token, GET request to / and change view to my messages
  }
  ngOnInit(): void {
  }

}
