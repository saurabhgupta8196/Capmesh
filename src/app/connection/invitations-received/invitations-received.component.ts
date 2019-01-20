import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-invitations-received',
  templateUrl: './invitations-received.component.html',
  styleUrls: ['./invitations-received.component.css']
})
export class InvitationsReceivedComponent implements OnInit {

  
  constructor(private connService: ConnectionService,private spinner: NgxSpinnerService, private auth:AuthService) { }

  user:String=this.auth.getUser();
  invitationsReceivedCount: number=0;
  invitationsReceived:any[]=[];
  spinTime = 1000;
  msg:string;

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
      this.msg="You have no pending requests"
    }, this.spinTime);
    this.connService.getReceivedInvitationsList(this.user).subscribe((data) => {
      for(let d of <string>data){
        this.invitationsReceived.push(d);
      }
    });
  }

  ngOnInit() {
    this.invitationsReceived=[];
    this.getInvitationReceivedCount();
    if (!this.invitationsReceivedCount) {
        this.spinTime = 3000;
      }
    this.getInvitationReceivedList();
  }

  acceptInvitation(requester){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
    this.connService.acceptInvitation(this.user,requester).subscribe((data)=>{
      for(let i of this.invitationsReceived){
        if(i._id==requester){
          let index=this.invitationsReceived.indexOf(i);
          this.invitationsReceived.splice(index,1);
        }
      }
      this.getInvitationReceivedCount();
    });
  }

  ignoreInvitation(sender){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.connService.ignoreInvitation(this.user,sender).subscribe((data)=>{
      for(let i of this.invitationsReceived){
        if(i._id==sender){
          let index=this.invitationsReceived.indexOf(i);
          this.invitationsReceived.splice(index,1);
        }
      }
      this.getInvitationReceivedCount();
    });
  }
}
