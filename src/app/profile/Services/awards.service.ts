import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { AuthService } from '../../auth.service';
import { ProfileService } from '../profile.service';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {
  

  constructor(private http: HttpClient, private auth:AuthService, private profile:ProfileService) { }

  private _urlGetAwards = 'http://10.102.55.73:8080/rest-api/users/get/';
  private _urlAddAward = 'http://10.102.55.73:8080/rest-api/users/addAward'
  private _urlUpdateAward = 'http://10.102.55.73:8080/rest-api/users/changeAward/';
  private _urlremoveAward = 'http://10.102.55.73:8080/rest-api/users/removeAward/';

  public objString;

  getAwards(): Observable<User[]> {
    return this.http.get<User[]>(this._urlGetAwards+""+this.profile.getUser());
  }

  updateAward(name: string, awardedBy: string, year: string, id: string): Observable<any> {
    this.objString = '{"userName":"'+ this.auth.getUser() +'","name":"' + name + '","awardedBy":"' + awardedBy + '","year":"' + year + '"}';
    console.log(JSON.parse(this.objString));
    return this.http.put<any>(this._urlUpdateAward + id, JSON.parse(this.objString));
  }

  addAward(awardObj): Observable<any> {
    return this.http.put<any>(this._urlAddAward, awardObj);
  }

  removeAward(id: string): Observable<any> {
    return this.http.put<any>(this._urlremoveAward + id, JSON.parse('{"userName":"'+this.auth.getUser()+'"}'))
  }

}
