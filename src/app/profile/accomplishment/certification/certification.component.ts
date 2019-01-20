import { Component, OnInit } from '@angular/core';
import { CertificationService } from '../../Services/certification.service'
import {NgForm} from '@angular/forms'
import { AuthService } from '../../../auth.service';
@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent implements OnInit {

  public userData = [];
  public certificationName;
  public issuedBy;
  public year;
  public id;
  public certificationName1;
  public issuedBy1;
  public year1;
  public strObj;


  constructor(private certificationService: CertificationService , private auth :AuthService) { }

  ngOnInit() {
    this.getCertification();
  }

  getCertification() {
    this.certificationService.getCertification().subscribe(data => this.userData = data);
  }

  updateCertification(id) {
    console.log(id);
    setTimeout(1500);
    for (var i of this.userData[0].profile.accomplishment.certifications) {
      console.log(i);
      if (i.certificateId == id) {
        this.id = id
        this.certificationName = i.name;
        this.issuedBy = i.issuedBy;
        this.year = i.year;
      }
    }
  }

  updateCertificationDatabase(des: string, comName: string, tPeriod: string) {
    console.log(des);
    this.certificationName = des;
    this.issuedBy = comName;
    this.year = tPeriod;
    this.certificationService.updateCertification(this.certificationName, this.issuedBy, this.year, this.id).subscribe(data => this.userData = data);
  }

  addCertificationDatabase(form : NgForm,des: string, comName: string, tPeriod: string) {
     if(des == undefined || comName == undefined || tPeriod == undefined){
      alert("Fields cannot be empty");
      return false;
    }
    this.certificationName1 = des;
    this.issuedBy1 = comName;
    this.year1 = tPeriod;
    this.strObj = '{"userName":"'+ this.auth.getUser() +'","name":"' + this.certificationName1 + '","issuedBy":"' + this.issuedBy1 + '","year":"' + this.year1 + '"}';
    this.strObj = JSON.parse(this.strObj);
    this.certificationService.addCertification(this.strObj).subscribe(data => this.userData = data)
  }

  removeCertification(id: string) {
    this.certificationService.removeCertification(id).subscribe(data => this.userData = data);
  }

}
