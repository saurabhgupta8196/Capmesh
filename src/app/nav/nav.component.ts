import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('userName')
    window.location.href = 'http://10.102.55.73:3000/logout'
  }

}
