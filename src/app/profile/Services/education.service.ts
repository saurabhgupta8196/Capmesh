import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { AuthService } from '../../auth.service';
import { ProfileService } from '../profile.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  
  constructor(private http: HttpClient, private auth:AuthService, private profile:ProfileService) { }

  private _urlGetEducation = 'http://10.102.55.73:8080/rest-api/users/get/';
  private _urlAddEducation = 'http://10.102.55.73:8080/rest-api/users/addEducation'
  private _urlUpdateEducation = 'http://10.102.55.73:8080/rest-api/users/updateEducation/';
  private _urlremoveEducation = 'http://10.102.55.73:8080/rest-api/users/removeEducation/'


  public objString;

  getEducation(): Observable<User[]> {
    return this.http.get<User[]>(this._urlGetEducation+""+this.profile.getUser());
  }

  updateEducation(degreeName: string, universityName: string, percentage: string, yearOfPassing:number, id: string): Observable<any> {
    this.objString = '{"userName":"'+ this.auth.getUser() +'","degreeName":"' + degreeName + '","university":"' + universityName + '","percentage":"' + percentage + '","yearOfPassing":"' + yearOfPassing + '"}';
    console.log(JSON.parse(this.objString));
    return this.http.put<any>(this._urlUpdateEducation + id, JSON.parse(this.objString));
  }

  addEducation(educationObj): Observable<any> {
    return this.http.put<any>(this._urlAddEducation, educationObj);
  }

  removeEducation(id: string): Observable<any> {
    return this.http.put<any>(this._urlremoveEducation + id, JSON.parse('{"userName":"'+this.auth.getUser()+'"}'))
  }

}
