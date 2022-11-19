import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';


@Component({
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent  {

    connected : boolean = false;
    loginUrl = `http://localhost:3000/login`;
    signinUrl = `http://localhost:3000/signin`;
    username = '';
    password = '';
    invalidInputMessageVisible: boolean = true; // Per alguna rao el valor d'aquesta variable fa el contrari del que jo esperaria xD
    
    constructor(private http : HttpClient, private router : Router) { }

    showInvalidInputMessage(): void {
        this.invalidInputMessageVisible = false;
    }
    submitForm(): void {
        console.log('im at the start of the function');
        if (!(this.username && this.password ))
            return this.showInvalidInputMessage();


        this.http.get('http://localhost:3000/login', { // Angular doesn't support get requests with a body!! I'll send username and password in headers and change the serverside code
            headers : {
                username : this.username,
                password : this.password
            }
        }).subscribe((res: any) => {
            console.log('Im in the subscribe callback');
            for (let key in res) { 
                console.log(key);
                console.log(res[key]);
            }
            
            sessionStorage["accessToken"] = res.accessToken;
            sessionStorage['username'] = this.username;
            
            this.router.navigate(['chat']);
        });
    }
}
