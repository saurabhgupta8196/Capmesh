import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseURL = "http://10.102.55.73:8080/rest-api/chats/"

  

  constructor(private http:HttpClient) { }

   hasConversationsWith(reqBody){
     return this.http.post(this.baseURL+"hasConversationsWith",reqBody);
   }

   getConversationOf(reqBody){
      return this.http.post(this.baseURL+"getchatsBetweenUsers",reqBody);
   }

   addNewMessage(reqBody){
     console.log(reqBody)
      return this.http.post(this.baseURL+"addChatsBetweenUsers",reqBody);
   }
}
