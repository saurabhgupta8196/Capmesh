import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private Route:Router,private route: ActivatedRoute, private auth:AuthService) { }

  ngOnInit() {
    let user = this.route.snapshot.paramMap.get('key')
    this.auth.setUser(user);
    console.log(user)
    this.Route.navigate(['home'])
  }

}
