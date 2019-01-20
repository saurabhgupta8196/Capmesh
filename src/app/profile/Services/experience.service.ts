import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { AuthService } from '../../auth.service';
import { ProfileService } from '../profile.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  
  constructor(private http: HttpClient, private auth:AuthService, private profile:ProfileService) { }

  private _urlGetExperience = 'http://10.102.55.73:8080/rest-api/users/get/';
  private _urlAddExperience = 'http://10.102.55.73:8080/rest-api/users/addExperience'
  private _urlUpdateExperience = 'http://10.102.55.73:8080/rest-api/users/updateExperience/';
  private _urlremoveExperience = 'http://10.102.55.73:8080/rest-api/users/removeExperience/';

  public objString;

  getExperience(): Observable<User[]> {
    return this.http.get<User[]>(this._urlGetExperience+""+this.profile.getUser());
  }

  updateExperienceDatabase(designation: string, companyName: string, timePeriod: string, id: string): Observable<any> {
    this.objString = '{"userName":"'+ this.auth.getUser() +'","designation":"'+ designation+ '","companyName":"'+ companyName +'","timePeriod":"'+ timePeriod+'"}';
    console.log(JSON.parse(this.objString));
    return this.http.put<any>(this._urlUpdateExperience+id, JSON.parse(this.objString));
  }

  addExperience(experienceObj):Observable<User[]>{
    return this.http.put<User[]>(this._urlAddExperience,experienceObj);
  }

  removeExperience(id:string): Observable<any>{
    return this.http.put<any>(this._urlremoveExperience+id,  JSON.parse('{"userName":"'+this.auth.getUser()+'"}'))
  }


}
