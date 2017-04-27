import { ChatMessage } from './chatmessage';
import { User } from './user';

export class ChatRoom {
    chatroomId: number;
    name: string;
    messages: ChatMessage[];
    participants: User[];
}