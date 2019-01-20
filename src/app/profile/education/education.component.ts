import { Component, OnInit } from '@angular/core';
import { EducationService } from '../Services/education.service';
import {NgForm} from '@angular/forms'
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  public userData = [];
  public isEditable = true;
  public degreeName;
  public universityName;
  public percentage;
  public yearOfPassing;
  public id;
  public degreeName1;
  public universityName1;
  public percentage1;
  public yearOfPassing1;
  public strObj;

  constructor(private educationService: EducationService, private auth:AuthService) { }

  ngOnInit() {
    this.getEducation();
  }
  getEducation() {
    this.educationService.getEducation().subscribe(data => this.userData = data);
  }
  updateEducation(id) {
    setTimeout(1500);
    for (var i of this.userData[0].profile.education) {
      console.log(i);
      if (i.educationId == id) {
        this.id = id
        this.degreeName = i.degreeName;
        this.universityName = i.university;
        this.percentage = i.percentage;
        this.yearOfPassing=i.yearOfPassing;
      }
    }
  }

  updateEducationDatabase(des: string, comName: string, tPeriod: string, yop:number) {
    this.degreeName = des;
    this.universityName = comName;
    this.percentage =  tPeriod;
    this.yearOfPassing=yop;
    this.educationService.updateEducation(this.degreeName, this.universityName, this.percentage, this.yearOfPassing , this.id).subscribe(data => this.userData =data);
  }

  addEducation(forms:NgForm,des: string, comName: string, tPeriod: string, yop:number){
     if(des == undefined || comName == undefined || tPeriod == undefined || yop == undefined){
      alert("Fields cannot be empty");
      return false;
    }
    this.degreeName1 = des;
    this.universityName1 = comName;
    this.percentage1 = tPeriod;
    this.yearOfPassing1 = yop;
    this.strObj =  '{"userName":"'+ this.auth.getUser() +'","degreeName":"' + this.degreeName1 + '","university":"' + this.universityName1 + '","percentage":"' + this.percentage1+ '","yearOfPassing":"' + this.yearOfPassing1+ '"}';
    this.strObj = JSON.parse(this.strObj);
    this.educationService.addEducation(this.strObj).subscribe(data => this.userData =data);
    forms.resetForm();
  }

  removeEducation(id:string){
    this.educationService.removeEducation(id).subscribe(data => this.userData =data);
  }

}
