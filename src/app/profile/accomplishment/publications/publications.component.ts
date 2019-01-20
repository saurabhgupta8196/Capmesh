import { Component, OnInit } from '@angular/core';
import { PublicationsService } from '../../Services/publications.service'
import{NgForm} from '@angular/forms'
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  public userData = [];
  public publicationName;
  public publicationTopic;
  public publishedBy;
  public year;
  public id;
  public publicationName1;
  public publicationTopic1;
  public publishedBy1
  public year1;
  public strObj;

  constructor(private publicationService: PublicationsService, private auth:AuthService) { }

  ngOnInit() {
    this.getPublication()
  }
  getPublication() {
    this.publicationService.getPublication().subscribe(data => this.userData = data);
  }

    updatePublication(id) {
    console.log(id);
    setTimeout(1500);
    for (var i of this.userData[0].profile.accomplishment.publications) {
      console.log(i);
      if (i.publicationId == id) {
        this.id = id
        this.publicationName = i.name;
        this.publicationTopic=i.topic
        this.publishedBy = i.publishedBy;
        this.year = i.year;
      }
    }
  }

  updatePublicationDatabase(des: string,topic:string, comName: string, tPeriod: string) {
    console.log(des);
    this.publicationName = des;
    this.publicationTopic=topic;
    this.publishedBy = comName;
    this.year = tPeriod;
    this.publicationService.updatePublication(this.publicationName,this.publicationTopic,this.publishedBy, this.year, this.id).subscribe(data => this.userData = data);
  }

  addPublicationDatabase(forms:NgForm,des: string,topic:string, comName: string, tPeriod: string) {
     if(des == undefined || comName == undefined || tPeriod == undefined || topic==undefined){
      alert("Fields cannot be empty");
      return false;
    }
    this.publicationName1 = des;
    this.publicationTopic1=topic;
    this.publishedBy1 = comName;
    this.year1 = tPeriod;
    this.strObj = '{"userName":"'+ this.auth.getUser() +'","name":"' + this.publicationName1 + '","topic":"' + this.publicationTopic1 + '","publishedBy":"' + this.publishedBy1 + '","year":"' + this.year1 + '"}';
    this.strObj = JSON.parse(this.strObj);
    this.publicationService.addPublication(this.strObj).subscribe(data => this.userData = data);
    forms.resetForm();
  }

  removePublication(id: string) {
    this.publicationService.removePublication(id).subscribe(data => this.userData = data);
  }

}
