import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ChatRoom } from '../models/chatroom';
import { ChatService } from '../services/chat.service';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  chatrooms: ChatRoom[];
  loading: boolean;

  constructor(
      private chatService: ChatService,
      private alertService: AlertService,
      private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    this.chatService.getAllChatRoomByUserId(this.authenticationService.getCurrentID())
      .subscribe(
        chatrooms => {
          this.chatrooms = chatrooms;
        }, 
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}
