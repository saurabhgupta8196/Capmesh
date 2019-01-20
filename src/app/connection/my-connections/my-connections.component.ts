import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-my-connections',
  templateUrl: './my-connections.component.html',
  styleUrls: ['./my-connections.component.css']
})
export class MyConnectionsComponent implements OnInit {

  user: String = this.auth.getUser();
  connectionsCount: number;
  connections: any[] = [];
  msg:string;
  constructor(private connService: ConnectionService, private spinner: NgxSpinnerService, private auth:AuthService) { }
  spinTime = 3000;

  getConnectionCount() {
    this.connService.getConnectionCount(this.user).subscribe((data) => {
      let x = JSON.stringify(data);
      this.connectionsCount = eval(x);
      if(this.connectionsCount>=4){
        this.spinTime=5000;
      }
    });
  }

  getConnectionsList() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.msg="You have No Connections"
    }, this.spinTime);
    this.connService.getConnectionsList(this.user).subscribe((data) => {
      for (let d of <string>data) {
        this.connections.push(d);
      }
    });
  }

  ngOnInit() {
    this.connections = [];
    this.getConnectionCount();
    this.getConnectionsList();
  }

  removeConnection(connection) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.connService.removeConnection(this.user, connection).subscribe((data) => {
      for (let i of this.connections) {
        if (i._id == connection) {
          let index = this.connections.indexOf(i);
          this.connections.splice(index, 1);
        }
      }
      this.getConnectionCount();
    });
  }

  blockConnection(blockee) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.connService.blockConnection(this.user, blockee).subscribe((data) => {
      for (let i of this.connections) {
        if (i._id == blockee) {
          let index = this.connections.indexOf(i);
          this.connections.splice(index, 1);
        }
      }
      this.removeConnection(blockee);
    });
  }

}
