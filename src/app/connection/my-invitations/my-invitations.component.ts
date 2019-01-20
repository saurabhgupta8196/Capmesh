import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../connection.service'

@Component({
  selector: 'app-my-invitations',
  templateUrl: './my-invitations.component.html',
  styleUrls: ['./my-invitations.component.css']
})
export class MyInvitationsComponent implements OnInit {

  constructor(private connService:ConnectionService) { }
  
  ngOnInit() {
  }
}
