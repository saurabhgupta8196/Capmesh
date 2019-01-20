import { Component, OnInit, Input, NgZone } from '@angular/core';
import { BioImageService } from '../Services/bio-image.service';
import { AuthService } from '../../auth.service';
import { ConnectionService } from '../../connection/connection.service';
@Component({
  selector: 'app-bio-image',
  templateUrl: './bio-image.component.html',
  styleUrls: ['./bio-image.component.css']
})
export class BioImageComponent implements OnInit {

  userData = []
  public isEditable = true;
  public connectionBtn = true;
  public blockBtn = true;
  public imageURL = "../../../assets/avatar.png";
  public name;
  fileToUpload: File = null;
  public bio;
  public emailid;
  public mobile;
  //public connect = false;
  constructor(private bioImageService: BioImageService, private auth: AuthService, private conn: ConnectionService) {
    //this.imageURL = cloudinary.cloudinaryInstance.image('koala')['src'];
  }

  ngOnInit() {
    this.getBio();
    //this.getConnect();

  }
  getBio() {
    this.bioImageService.getBio().subscribe(data => this.userData.push(data[0]));
    console.log(this.userData);
  }

  // getConnect(){
  //   console.log(this.userData[0].name);
  //   // if("dip95"==this.userData[0].userName){
  //   //   this.connect=!this.connect;
  //   // }
  // }

  fetch() {
    this.name = this.userData[0].name;
    this.bio = this.userData[0].profile.bio;
    this.emailid = this.userData[0].email;
    this.mobile = this.userData[0].mobile;
  }

  update(des: string, comName: string) {
    console.log(des);
    this.name = des;
    this.bio = comName;
    this.bioImageService.updateName(this.name).subscribe(data => this.userData = data);
    this.bioImageService.updateBio(this.bio).subscribe(data => this.userData = data);
  }

  update1(tPeriod: string, tmobile: string) {
    this.emailid = tPeriod;
    this.mobile = tmobile;
    this.bioImageService.updateEmail(this.emailid).subscribe(data => this.userData = data);
    this.bioImageService.updateMobile(this.mobile).subscribe(data => this.userData = data);
  }

  changeImage(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  public sendConnectionRequest(receiver) {
    let sender = this.auth.getUser();
    console.log(sender, receiver)
    this.conn.sendConnectionRequest(sender, receiver).subscribe(data => {
      this.connectionBtn = false;
    })
  }

  public blockUser(blockee) {
    let user = this.auth.getUser()
    this.conn.blockConnection(user, blockee).subscribe(data => {
      this.blockBtn = false;
    })
  }

}
