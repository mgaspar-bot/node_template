import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnChanges {

  constructor(private http : HttpClient) { }
  connected : boolean = false;
  loginUrl = `http://localhost:3000/login`;
  signinUrl = `http://localhost:3000/signin`;

  adminLogin() {
    const username : string = (document.getElementById(`login`) as HTMLInputElement)?.value;
    const socket = io(`http://localhost:3000?username=${username}`);
    console.log(socket);
    if(socket) this.connected = true; else this.connected = false;
  }

  signinButton() : void {
}

loginButton() : void {
    let response = this.http.get(this.loginUrl);
    
  }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      
  }

}
