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

    invalidInputMessageVisible: boolean = true; // Per alguna rao el valor d'aquesta variable fa el contrari del que jo esperaria xD

    http: HttpClient;

    constructor(http: HttpClient, private router : Router) {  // Is this how one injects dependencies?
        this.http = http;
    }

    showInvalidInputMessage(): void {
        this.invalidInputMessageVisible = false;
    }

    submitForm(): void {
        console.log('im at the start of the funci');

// validate inputs
        if (!(this.username && this.password && this.confirmPassword) || this.password !== this.confirmPassword)
            return this.showInvalidInputMessage();

// send them to backend
        this.http.post('http://localhost:3000/signin', { // Per poder accedir a aquest body des del backend cal el middleware express.json()
            username: this.username,
            password: this.password
        }).subscribe((res: any) => {
// handle succesful response in the callback
            console.log('Im in the subscribe callback');
            for (let key in res) { // Seems like i can only access the body with the token and the message i wrote
                console.log(key);
                console.log(res[key]);
            }
            
            
            sessionStorage["accessToken"] = res.accessToken;
            sessionStorage['username'] = this.username;
            
            
            
            
            // store username and token here in the front somehow
            // get the token through the middleware?? 
            // activate chat component route
            this.router.navigate(['chat']);
            
            // TODO make chat component receive username somehow
        });
// how do i catch 40X responses, like if the user already exists?
    }

}
