import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

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
