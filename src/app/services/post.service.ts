import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/Http';

import { Observable } from 'rxjs';
import { IPost } from '../post/IPost';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public _urlPosts = 'http://10.102.55.73:8080/rest-api/users/post/load'
  public _urlCreate = 'http://10.102.55.73:8080/rest-api/users/create/post';
  public _urlLikePost = 'http://10.102.55.73:8080/rest-api/users/post/like';
  public _urlUnLikePost = 'http://10.102.55.73:8080/rest-api/users/post/unlike';

  public _urlEditPost = 'http://10.102.55.73:8080/rest-api/users/edit/post/';
  public _urlDeletePost = 'http://10.102.55.73:8080/rest-api/users/delete/posts/';

  constructor(private http: HttpClient, private auth: AuthService) { }


  getPosts(): Observable<any[]> {
    return this.http.post<any[]>(this._urlPosts, {userName: this.auth.getUser()});
  }

  addPosts(value): Observable<any[]> {
    return this.http.patch<any[]>(this._urlCreate, {...value, userName: this.auth.getUser()}) // take username from session
  }

  addLike(objValue): Observable<any[]> {
    return this.http.post<any[]>(this._urlLikePost, objValue);
  }

   removeLike(objValue):Observable<any[]>{
    return this.http.post<any[]>(this._urlUnLikePost,objValue);
  }

   fetchingLikes(pName,pId):Observable<IPost[]>{
   return this.http.get<IPost[]>('http://10.102.55.73:8080/rest-api/users/post/getLikesdetails/'+pName+'/'+pId)
}

  editPosts(postId,value): Observable<any[]> {
    return this.http.patch<any[]>(this._urlEditPost + postId, {...value, userName: this.auth.getUser()}) // take username from session
  }

deletePosts(postId){
 return this.http.patch<any[]>(this._urlDeletePost + postId,{userName: this.auth.getUser()}) // take username from session
}

  postComment(username,postid,data):Observable<IPost[]>{ 
    var result =  this.http.put<IPost[]>('http://10.102.55.73:8080/rest-api/users/post/updateComments/'+username+'/'+postid,data);
    //console.log(result);
    return result;
  }

}
