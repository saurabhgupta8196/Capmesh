import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { AuthService } from '../../auth.service';
import { ProfileService } from '../profile.service';
@Injectable({
  providedIn: 'root'
})
export class BioImageService {

   
  constructor(private http:HttpClient, private auth:AuthService, private profile:ProfileService ) { }

  private _urlGetProfile = 'http://10.102.55.73:8080/rest-api/users/get/';
   private _urlUpdateName = 'http://10.102.55.73:8080/rest-api/users/updateName';
   private _urlUpdateBio = 'http://10.102.55.73:8080/rest-api/users/updateBio';
   private _urlUpdateEmail = 'http://10.102.55.73:8080/rest-api/users/updateEmail';
   private _urlUpdateMobile = 'http://10.102.55.73:8080/rest-api/users/updateMobile';

    public objString;

  getBio(): Observable<User[]>{
    return this.http.get<User[]>(this._urlGetProfile+""+this.profile.getUser());
  }

  updateName(name: string): Observable<any> {
    this.objString = '{"userName":"'+ this.auth.getUser() +'","name":"' + name + '"}';
    console.log(JSON.parse(this.objString));
    return this.http.put<any>(this._urlUpdateName, JSON.parse(this.objString));
  }

  updateBio(bio: string): Observable<any> {
    this.objString = '{"userName":"'+ this.auth.getUser() +'","bio":"' + bio + '"}';
    console.log(JSON.parse(this.objString));
    return this.http.put<any>(this._urlUpdateBio, JSON.parse(this.objString));
  }

  updateEmail(email: string): Observable<any> {
    this.objString = '{"userName":"'+ this.auth.getUser() +'","email":"' + email + '"}';
    console.log(JSON.parse(this.objString));
    return this.http.put<any>(this._urlUpdateEmail, JSON.parse(this.objString));
  }

  updateMobile(mobile: string): Observable<any> {
    this.objString = '{"userName":"'+ this.auth.getUser() +'","mobile":"' + mobile + '"}';
    console.log(JSON.parse(this.objString));
    return this.http.put<any>(this._urlUpdateMobile, JSON.parse(this.objString));
  }

}
