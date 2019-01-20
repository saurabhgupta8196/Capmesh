import { Component, OnInit } from '@angular/core';
import { AwardsService } from '../../Services/awards.service';
import {NgForm} from '@angular/forms';
import { AuthService } from '../../../auth.service';
@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {
  public userData = [];
  public awardName;
  public awardedBy;
  public year;
  public id;
  public awardName1;
  public awardedBy1;
  public year1;
  public strObj;

  constructor(private awardsService: AwardsService, private auth: AuthService) { }

  ngOnInit() {
    this.getAwards();
  }
  getAwards() {
    this.awardsService.getAwards().subscribe(data => this.userData = data);
  }

  updateAwards(id) {
    console.log(id);
    setTimeout(1500);
    for (var i of this.userData[0].profile.accomplishment.awards) {
      console.log(i);
      if (i.awardId == id) {
        this.id = id
        this.awardName = i.name;
        this.awardedBy = i.awardedBy;
        this.year = i.year;
      }
    }
  }

  updateAwardsDatabase(des: string, comName: string, tPeriod: string) {
    console.log(des);
    this.awardName = des;
    this.awardedBy = comName;
    this.year = tPeriod;
    this.awardsService.updateAward(this.awardName, this.awardedBy, this.year, this.id).subscribe(data => this.userData = data);
  }

  addAwardsDatabase(forms:NgForm,des: string, comName: string, tPeriod: string) {
    if(des == undefined || comName == undefined || tPeriod == undefined){
      alert("Fields cannot be empty");
      return false;
    }
    this.awardName1 = des;
    this.awardedBy1 = comName;
    this.year1 = tPeriod;
    this.strObj = '{"userName":"'+ this.auth.getUser() +'","name":"' + this.awardName1 + '","awardedBy":"' + this.awardedBy1 + '","year":"' + this.year1 + '"}';
    this.strObj = JSON.parse(this.strObj);
    this.awardsService.addAward(this.strObj).subscribe(data => this.userData = data);
    forms.resetForm();
  }

  removeAwards(id: string) {
    this.awardsService.removeAward(id).subscribe(data => this.userData = data);
  }

}
