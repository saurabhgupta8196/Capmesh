import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent implements OnInit {

  
  constructor(private connService: ConnectionService, private spinner: NgxSpinnerService, private auth:AuthService) { }

  user: string = this.auth.getUser();
  blockListCount: string;
  blockList: any[] = [];
  spinTime = 1000;
  msg:string;

  getblockListCount() {
    this.connService.getblockListCount(this.user).subscribe((data) => {
      let x = JSON.stringify(data);
      this.blockListCount = eval(x);
      if (this.blockListCount != "0") {
        this.spinTime = 3000;
      }
    });
  }

  getblockList() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.msg="You have No Blocked Connections"
    }, this.spinTime);
    this.connService.getblockList(this.user).subscribe((data) => {
      for (let d of <string>data) {
        this.blockList.push(d);
      }
    });
  }


  ngOnInit() {
    this.blockList = [];
    this.getblockListCount();
    this.getblockList();
  }

  unblockConnection(blockee) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, this.spinTime);
    this.connService.unblockConnection(this.user, blockee).subscribe((data) => {
      for (let i of this.blockList) {
        if (i._id == blockee) {
          let index = this.blockList.indexOf(i);
          this.blockList.splice(index, 1);
        }
      }
      this.getblockListCount();
    });
  }
}
