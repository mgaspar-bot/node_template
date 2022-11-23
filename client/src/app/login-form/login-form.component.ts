import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    errorMessage = '';
    
    constructor(private http : HttpClient, private router : Router) { }

    showInvalidInputMessage(): void {
        this.invalidInputMessageVisible = false;
    }
    submitForm(): void {
        console.log('im at the start of the function');
        if (!(this.username && this.password ))
            return this.showInvalidInputMessage();

        let response : Observable<HttpResponse<Object>> = this.http.get('http://localhost:3000/login', {                                                          // Angular doesn't support get requests with a body!! I'll send username and password in headers and change the serverside code
            observe : 'response', // This configs the get method to return the full response in the observable
            headers : {
                username : this.username,
                password : this.password
            }
        })        
        let sub = response.subscribe({
            next: (response : any) => {
                sessionStorage["accessToken"] = response?.body.accessToken;
                sessionStorage['username'] = this.username;
                this.router.navigate(['chat']); 
            },
            error: (error : any) => {
                console.log(error);
                this.errorMessage = error.error.msg; 
            } 
        });
    }
}

/*
Passant un segon callback per errors puc caçar-los, però em diu que el metode esta deprecated 
*/
