import { Component, OnInit } from '@angular/core';

@Component({
  template : `
 <div class="super-container">
 <div class="container">
    <h1>This is not the page you were looking for!</h1>
  <br><br>
  <img src="../assets/notfound.jpg" width=40%>
  <br><br>
  <a routerLink="">Go home</a>
</div>
 </div>
  `,
  styleUrls: ["./not-found.component.css"]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
