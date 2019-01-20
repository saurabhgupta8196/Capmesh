/**
 * @author Harshita Shrivastava
 * @version 1.0
 * @since 29-08-2018
 * 
 * Connection Service to fetch data from the server
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  baseUrl = "http://10.102.55.73:8080/rest-api/user"
  constructor(private http: HttpClient, private auth:AuthService) { }

  /**
   * Description - Get all the data of a (user) from server
   * @author Harshita
   * @param {string} userName- name of user whose's data is to be fetched
   * @returns {Observable<Object>} user data returned from the server
  */
  getUserData(userName: String): Observable<Object> {
    let url = this.baseUrl + '/getData';
    let body = { "user": userName }
    return this.http.post(url, body);
  }

  /**
   * Description - Get the number of connections from server
   * @author Harshita
   * @param {string} userName- name of user whose's data is to be fetched
   * @returns {Observable<Object>} count returned from the server
  */
  getConnectionCount(userName: String): Observable<Object> {
    let url = this.baseUrl + '/get-count/connections';
    let body = { "user": userName };
    return this.http.post(url, body);
  }

  /**
   * Description - Get the list of connections from server
   * @author Harshita
   * @param {string} userName- name of user whose's data is to be fetched
   * @returns {Observable<Object>} list returned from the server
  */
  getConnectionsList(userName: String): Observable<Object> {
    let url = this.baseUrl + '/get-all-connections';
    let body = { "user": userName };
    return this.http.post(url, body);
  }

  /**
   * Description - Get the number of invitations received from server
   * @author Harshita
   * @param {string} userName- name of user whose's data is to be fetched
   * @returns {Observable<Object>} count returned from the server
  */
  getInvitationReceivedCount(userName: String): Observable<Object> {
    let url = this.baseUrl + '/get-invitation-count/received';
    let body = { "user": userName };
    return this.http.post(url, body);
  }

  /**
   * Description - Get the list of invitations received from server
   * @author Harshita
   * @param {string} userName- name of user whose's data is to be fetched
   * @returns {Observable<Object>} list returned from the server
  */
  getReceivedInvitationsList(userName: String): Observable<Object> {
    let url = this.baseUrl + '/get-invitations/received';
    let body = { "user": userName };
    return this.http.post(url, body);
  }

  /**
   * Description - Get the number of invitations sent from server
   * @author Harshita
   * @param {string} userName- name of user whose's data is to be fetched
   * @returns {Observable<Object>} count returned from the server
  */
  getInvitationSentCount(userName: String): Observable<Object> {
    let url = this.baseUrl + '/get-invitation-count/sent';
    let body = { "user": userName };
    return this.http.post(url, body);
  }

  /**
   * Description - Get the list of invitations sent from server
   * @author Harshita
   * @param {string} userName- name of user whose's data is to be fetched
   * @returns {Observable<Object>} list returned from the server
  */
  getSentInvitationsList(userName: String): Observable<Object> {
    let url = this.baseUrl + '/get-invitations/sent';
    let body = { "user": userName };
    return this.http.post(url, body);
  }

  /**
   * Description - Accept the connection request of a user
   * @author Harshita
   * @param {string} userName- name of user 
   * @param {string} requester- name of requester
   * @returns {Observable<Object>} result returned from the server
  */
  acceptInvitation(userName: String,requester:String):Observable<Object>{
    let url = this.baseUrl + '/accept-invitation';
    let body = { "user": userName,"requester":requester };
    return this.http.post(url, body);
  }

  /**
   * Description - Ignore the connection request of a user
   * @author Harshita
   * @param {string} userName- name of user 
   * @param {string} sender name of sender
   * @returns {Observable<Object>} result returned from the server
  */
  ignoreInvitation(userName: String,sender:String):Observable<Object>{
    let url = this.baseUrl + '/ignore-invitation';
    let body = { "user": userName,"sender":sender };
    return this.http.post(url, body);
  }

  /**
   * Description - Remove a connection
   * @author Harshita
   * @param {string} userName- name of user 
   * @param {string} connection name of connection
   * @returns {Observable<Object>} result returned from the server
  */
  removeConnection(userName: String,connection:String):Observable<Object>{
    let url = this.baseUrl + '/remove-connection';
    let body = { "user": userName,"connection":connection };
    return this.http.post(url, body);
  }

  /**
   * Description - Block a connection
   * @author Harshita
   * @param {string} userName- name of user 
   * @param {string} blockee name of connection to be blocked
   * @returns {Observable<Object>} result returned from the server
  */
  blockConnection(userName: String,blockee:String):Observable<Object>{
    let url = this.baseUrl + '/block';
    let body = { "user": userName,"blockee":blockee };
    return this.http.post(url, body);
  }

  /**
   * Description - Unblock a connection
   * @author Harshita
   * @param {string} userName- name of user 
   * @param {string} blockee name of connection to be blocked
   * @returns {Observable<Object>} result returned from the server
  */
  unblockConnection(userName: String,blockee:String):Observable<Object>{
    let url = this.baseUrl + '/unblock';
    let body = { "user": userName,"blockee":blockee };
    return this.http.post(url, body);
  }

  /**
   * Description - Get the list of blocked users
   * @author Harshita
   * @param {string} userName- name of user 
   * @returns {Observable<Object>} result returned from the server
  */
  getblockList(userName: String):Observable<Object>{
    let url = this.baseUrl + '/get-block-list';
    let body = { "user": userName};
    return this.http.post(url, body);
  }

  /**
   * Description - Get the count of blocked users
   * @author Harshita
   * @param {string} userName- name of user 
   * @returns {Observable<Object>} result returned from the server
  */
  getblockListCount(userName: String):Observable<Object>{
    let url = this.baseUrl + '/block-list-count';
    let body = { "user": userName};
    return this.http.post(url, body);
  }

  /**
   * Description - Get the count of blocked users
   * @author Harshita
   * @param {string} sender- name of user who is sending request
   * @param {string} receiver- name of receiver to whom request is being sent
   * @returns {Observable<Object>} result returned from the server
  */
  sendConnectionRequest(sender: String,receiver:String):Observable<Object>{
    let url = this.baseUrl + '/send-invitation';
    let body = { "user": sender,"receiver":receiver};
    return this.http.post(url, body);
  }

  /**
   * Description - Follow a company profile
   * @author Harshita
   * @param {string} user- name of user
   * @param {string} companyId- Id of company which the user wants to follow
   * @returns {Observable<Object>} result returned from the server
  */
  followCompany(user: String,companyId:String):Observable<Object>{
    let url = this.baseUrl + '/follow-company';
    let body = { "user": user,"companyId":companyId};
    return this.http.post(url, body);
  }
}
