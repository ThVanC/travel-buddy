import { ChatMessage } from './chatmessage';

export class ChatRoom {
    chatroomId: number;
    name: string;
    messages: ChatMessage[];
}