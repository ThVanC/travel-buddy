import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../../models/chatmessage';
import { User } from '../../models/user';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  @Input() currentUserId: number;
  @Input() chatMessages: ChatMessage[];

  constructor() { }

  ngOnInit() {
  }

}
