import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../Services/skills.service';
import { NgForm } from '@angular/forms'
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  public userData = [];
  public skillName1 = '';
  public strObj;
  constructor(private skillsService: SkillsService, private auth:AuthService) { }

  ngOnInit() {
    this.getSkills();
  }

  getSkills() {
    this.skillsService.getSkills().subscribe(data => {
      this.userData = data
      console.log(this.userData[0].profile.skills)
    });
  }

  addskillDatabase(forms: NgForm, skill: string) {
    this.skillName1 = skill;
    console.log(this.skillName1)
    this.skillsService.addSkills(this.skillName1).subscribe(data => this.userData = data);
    forms.resetForm();
  }

  removeSkills(skill: string) {
    this.skillsService.removeSkills(skill).subscribe(data => this.userData = data);
  }

}
