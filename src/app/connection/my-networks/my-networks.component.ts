import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-my-networks',
  templateUrl: './my-networks.component.html',
  styleUrls: ['./my-networks.component.css']
})
export class MyNetworksComponent implements OnInit {

  user: String = this.auth.getUser();
  connectionsCount: String = "0";
  invitationsReceivedCount: string;
  spinTime=3000;
  msg:string;
  invitationsReceived: any[] = [];
  constructor(private connService: ConnectionService, private spinner: NgxSpinnerService, private auth:AuthService) { }

  getConnectionCount() {
    this.connService.getConnectionCount(this.user).subscribe((data) => {
      let x = JSON.stringify(data);
      this.connectionsCount = x;
    });
  }

  getInvitationReceivedCount() {
    this.connService.getInvitationReceivedCount(this.user).subscribe((data) => {
      let x = JSON.stringify(data);
      this.invitationsReceivedCount = eval(x);
    })
  }

  getInvitationReceivedList() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.msg="You have No Pending Invitations"
    }, this.spinTime);
    this.connService.getReceivedInvitationsList(this.user).subscribe((data) => {
      let count = 0;
      for (let d of <string>data) {
        if (count < 3) {
          this.invitationsReceived.push(d);
          count++;
        }
      }
    });
  }

  ngOnInit() {
    this.invitationsReceived = [];
    this.getConnectionCount();
    this.getInvitationReceivedCount();
    this.getInvitationReceivedList();
  }

  acceptInvitation(requester) {
        this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
    this.connService.acceptInvitation(this.user, requester).subscribe((data) => {
      for (let i of this.invitationsReceived) {
        if (i._id == requester) {
          let index = this.invitationsReceived.indexOf(i);
          this.invitationsReceived.splice(index, 1);
        }
      }
      this.getInvitationReceivedCount();
      this.getConnectionCount();
    });
  }

  ignoreInvitation(sender) {
        this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.connService.ignoreInvitation(this.user, sender).subscribe((data) => {
      for (let i of this.invitationsReceived) {
        if (i._id == sender) {
          let index = this.invitationsReceived.indexOf(i);
          this.invitationsReceived.splice(index, 1);
        }
      }
      this.getInvitationReceivedCount();
    });
  }

}