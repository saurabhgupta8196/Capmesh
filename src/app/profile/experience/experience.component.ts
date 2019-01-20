import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../Services/experience.service';
import { NgForm } from '@angular/forms'
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  public userData = []
  public designation;
  public companyName;
  public timePeriod;
  public id;
  public designation1;
  public companyName1;
  public timePeriod1;

  public strObj;

  constructor(private experienceService: ExperienceService, private auth:AuthService) { }

  ngOnInit() {
    this.getExperience();
  }

  getExperience() {
    this.experienceService.getExperience().subscribe(data => this.userData = data);
  }

  updateExperience(id) {
    setTimeout(1500);
    for (var i of this.userData[0].profile.experience) {
      if (i.experienceId == id) {
        this.id = id
        this.designation = i.designation;
        this.companyName = i.companyName;
        this.timePeriod = i.timePeriod;
      }
    }
  }

  updateExperienceDatabase(des: string, comName: string, tPeriod: string) {
    this.designation = des;
    this.companyName = comName;
    this.timePeriod = tPeriod;
    this.experienceService.updateExperienceDatabase(this.designation, this.companyName, this.timePeriod, this.id).subscribe(data => this.userData = data);
  }

  addExpereinceDatabase(form: NgForm, des: string, comName: string, tPeriod: string) {
    if (des == undefined || comName == undefined || tPeriod == undefined) {
      alert("Fields cannot be empty");
      return false;
    }
    this.designation1 = des;
    this.companyName1 = comName;
    this.timePeriod1 = tPeriod;
    this.strObj = '{"userName":"'+ this.auth.getUser() +'","designation":"' + this.designation1 + '","companyName":"' + this.companyName1 + '","timePeriod":"' + this.timePeriod1 + '"}';
    this.strObj = JSON.parse(this.strObj);
    this.experienceService.addExperience(this.strObj).subscribe(data => this.userData = data);
    form.resetForm();
  }

  removeExperience(id: string) {
    this.experienceService.removeExperience(id).subscribe(data => this.userData = data);
  }

}
