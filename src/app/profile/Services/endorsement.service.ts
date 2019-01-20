import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { AuthService } from '../../auth.service';
import { ProfileService } from '../profile.service';
@Injectable({
  providedIn: 'root'
})
export class EndorsementService {
  

  constructor(private http: HttpClient, private auth:AuthService, private profile:ProfileService) { }

  private _urlGetEndorsement = 'http://10.102.55.73:8080/rest-api/users/get/';
  private _urlAddEndorsement = 'http://10.102.55.73:8080/rest-api/users/addEndorsement/dip95'
  public objString;

  getEndorsement(): Observable<User[]> {
    return this.http.get<User[]>(this._urlGetEndorsement+""+this.profile.getUser());
  }

  addEndorsement(endorseObj):Observable<User[]>{
    return this.http.put<User[]>(this._urlAddEndorsement,endorseObj);
  }

}

