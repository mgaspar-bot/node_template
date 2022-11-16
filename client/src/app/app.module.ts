import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SigninFormComponent } from './signin-form/signin-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ChatRoomComponent,
    NotFoundComponent,
    SigninFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
        {path : '', component: LoginFormComponent},
        {path : 'signin', component: SigninFormComponent},
        {path : 'chat',  component: ChatRoomComponent},
        {path : '**', component : NotFoundComponent}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
