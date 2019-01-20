import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profile: ProfileService, private route: ActivatedRoute, private auth: AuthService) { }
  
  ngOnInit() {
    if(this.route.snapshot.paramMap.get('userName')) {
      this.profile.setUser(this.route.snapshot.paramMap.get('userName'))
    }
    else {
      this.profile.setUser(this.auth.getUser())
    }
  }

  

}
