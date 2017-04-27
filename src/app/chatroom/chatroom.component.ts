import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../services/alert.service';
import {ChatService} from '../services/chat.service';
import {AuthenticationService} from '../services/authentication.service';
import { ChatRoom } from '../models/chatroom';
import { ChatMessage } from '../models/chatmessage';
import { User } from '../models/user';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  loading: boolean = false;
  private sub: any;
  chatroomId: number;
  currentUser: User;
  messageInput: string;

  @Input() chatroom: ChatRoom;

  constructor(
      private route: ActivatedRoute,
      private alertService: AlertService,
      private chatService: ChatService,
      private authenticationService: AuthenticationService) { }

  ngOnInit() { 
    this.currentUser = this.authenticationService.getCurrentUser();
    this.sub = this.route.params.subscribe(params => {
       this.chatroomId = +params['id']; // (+) converts string 'id' to a number
    });
    this.chatService.getChatRoomById(this.chatroomId)
      .subscribe(
        chatroom => {
          this.chatroom = chatroom;
        }, 
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  addMessage(){
    this.chatService.postInChatRoomById(this.chatroom.chatroomId, this.authenticationService.getCurrentID(), this.messageInput)
      .subscribe(
        () => {
          var messageToAdd = new ChatMessage();
          messageToAdd.message = this.messageInput;
          messageToAdd.user = this.currentUser;

          this.chatroom.messages.push(
              messageToAdd
          );
          this.messageInput = "";
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

}
