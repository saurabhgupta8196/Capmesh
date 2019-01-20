import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-invitations-sent',
  templateUrl: './invitations-sent.component.html',
  styleUrls: ['./invitations-sent.component.css']
})
export class InvitationsSentComponent implements OnInit {

  user:String=this.auth.getUser();
  invitationsSentCount: String;
  invitationsSent:any[]=[];
  spinTime=2000;
  msg:string;
  constructor(private connService: ConnectionService,private spinner: NgxSpinnerService, private auth:AuthService) { }

  getInvitationSentCount() {
    this.connService.getInvitationSentCount(this.user).subscribe((data) => {
      let x = JSON.stringify(data);
      this.invitationsSentCount = eval(x);
    })
  }

  getInvitationSentList() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.msg="You have sent no requests"
    }, this.spinTime);
    this.connService.getSentInvitationsList(this.user).subscribe((data) => {
      for(let d of <string>data){
        this.invitationsSent.push(d);
      }
    });
  }

  ngOnInit() {
    this.invitationsSent=[];
    this.getInvitationSentCount();
    this.getInvitationSentList();
  }

}
