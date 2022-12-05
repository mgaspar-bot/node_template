import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin-form',
    templateUrl: './signin-form.component.html',
    styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent {

    username = '';

    password = '';

    confirmPassword = '';

    invalidInputMessageHidden: boolean = true;

    http: HttpClient;

    errorMessage = '';

    constructor(http: HttpClient, private router : Router) {  // Is this how one injects dependencies?
        this.http = http;
    }

    showInvalidInputMessage(): void {
        this.invalidInputMessageHidden = false;
    }

    submitForm(): void {
        // console.log('im at the start of the funci');

            // validate inputs
        if (!(this.username && this.password && this.confirmPassword) || this.password !== this.confirmPassword)
            return this.showInvalidInputMessage();

            // send them to backend
        this.http.post('http://localhost:3000/signin', { // Per poder accedir a aquest body des del backend cal el middleware express.json()
            username: this.username,
            password: this.password
            // set up listeners for server response
        }).subscribe({
            next: (res: any) => {
                // console.log('Im in the subscribe callback');
                sessionStorage["accessToken"] = res.accessToken;
                sessionStorage['username'] = this.username;
                this.router.navigate(['chat']);
            }, 
            error: (error : any) => {
                // console.log('i got the error boss!');
                console.log(error);
                console.log(error.error.msg);
                this.errorMessage = error.error.msg;
            }
        });
    }
}
