import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class ChatService {

    constructor(private http: Http) { }
 
    getAllChatRoomByUserId(userId: number){
        return this.http.get('/api/chatroom/byUserId' + userId, this.jwt()).map((response: Response) => response.json());
    }

    getChatRoomById(chatroomId: number) {
        return this.http.get('/api/chatroom/' + chatroomId, this.jwt()).map((response: Response) => response.json());
    }
 
    postInChatRoomById(chatroomId: number, userId: number, message: string) {
        return this.http.post('/api/chatroom/' + chatroomId + '/' + userId, message, this.jwt()).map((response: Response) => response.json());
    }
 
    joinChatroomById(chatroomId: number, userId: number) {
        return this.http.put('/api/chatroom/' + chatroomId + '/' + userId, this.jwt()).map((response: Response) => response.json());
    }

    leaveChatroomById(chatroomId: number, userId: number) {
        return this.http.delete('/api/chatroom/' + chatroomId + '/' + userId, this.jwt()).map((response: Response) => response.json());
    }
 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}