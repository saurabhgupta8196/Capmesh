import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user;
  constructor() { }

  setUser(user){
    this.user = user;
    sessionStorage.setItem('userName',user)
  }
  getUser():string{
    return sessionStorage.getItem('userName')
  }
}
