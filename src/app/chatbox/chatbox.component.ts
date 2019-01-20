import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { PerfectScrollbarComponent,PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Ng2EmojiService } from 'ng2-emoji';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit,OnDestroy {

  hasConversationsWithList = [];
  messagesBetweenUsers = [];
  newMessage = "";
  timerChats;
  emojis: Array<string>;
  // myMessageString;
  timerConvos;
  currentUser = sessionStorage.getItem('userName');
  otherUser = undefined;

  constructor(private chatService: ChatService, private route:ActivatedRoute) {
    // this.myMessageString = 'Hello, how are you? :smile: It was fun at the bowling game the other day :joy:';
    this.emojis = Ng2EmojiService.emojis;
    this.hasConversationsWith(this.currentUser);
    this.otherUser = this.route.snapshot.paramMap.get('userName')
  }

ngOnDestroy(){
  clearInterval(this.timerChats);
  clearInterval(this.timerConvos);
}

  ngOnInit() {
   this.timerConvos= setInterval(() => {
      this.hasConversationsWith(this.currentUser);
    }, 2000)
    if(this.otherUser) {
      this.handleOnUserChatChange(this.otherUser)
    }
  }
  //handleOnUserChatChange
  handleOnUserChatChange(otherUser) {
    clearInterval(this.timerChats)
    this.otherUser = otherUser;
    this.messagesBetweenUsers = [];
    this.getConversationOf(this.otherUser);
    this.RefreshUserChats(this.otherUser)
  }
  //handle sendMessage
  handleSendMessage() {
    console.log(this.newMessage);
    let conversation = { "userName": this.currentUser, "receiver": this.otherUser, "content": this.newMessage };
    //  this.messagesBetweenUsers.push(conversation);
    this.addNewMessage(conversation);
    this.newMessage = "";

  }
  //function to refresh userchats
  RefreshUserChats(otherUser) {
    console.log("timer start");
    this.timerChats = setInterval(() => {
      this.chatService.getConversationOf({ "userName": this.currentUser, "receiver": otherUser }).subscribe((messageData: test) => {
        this.messagesBetweenUsers = [];
        this.messagesBetweenUsers = messageData.val;
      });

    }, 2000);
  }
  //function to fatech userlist that user  has conversation with
  hasConversationsWith(user) {
    this.chatService.hasConversationsWith({ "userName": user }).subscribe((userData: test) => {
      this.hasConversationsWithList = [];
      userData.val.map(conversation => {
        let content
        if (conversation.lastMessage.content.length > 25) {
          content = conversation.lastMessage.content.substr(0, 25) + "...";
        }
        else {
          content = conversation.lastMessage.content
        }
        let userList = {
          "participant": conversation.participant[0],
          "sender": conversation.lastMessage.sender,
          "content": content,
          "timestamp": conversation.lastMessage.timestamp
        }
        this.hasConversationsWithList.push(userList);
        this.hasConversationsWithList.sort((a, b) => {
          if (a.timestamp > b.timestamp)
            return -1
          else if (a.timestamp < b.timestamp)
            return 1
          else
            return 0;
        });
      })
    });

  }
  //function to retrive messages between two users
  getConversationOf(otherUser) {
    this.chatService.getConversationOf({ "userName": this.currentUser, "receiver": otherUser }).subscribe((messageData: test) => {
      this.messagesBetweenUsers = messageData.val;
    });
  }
  //function to add new message
  addNewMessage(messageObject) {
    console.log("add new msg called", messageObject);
    this.chatService.addNewMessage(messageObject).subscribe(data => {
      console.log(data);
    });
  }

  isCurrentUser(u) {
    switch (u) {
      case this.currentUser: {
        return true;
      }
      case this.otherUser: {
        return false;
      }
    }
  }

  addEmoji(emoji:any){
    console.log("add Emoji on "+ emoji);
    this.newMessage= this.newMessage+":"+emoji+":";
    console.log("new Message is  " +this.newMessage);
  }


}



interface test {
  val: any
}


