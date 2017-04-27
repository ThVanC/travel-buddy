import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Photo } from '../models/photo';

@Injectable()
export class PhotoService {

    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get('/api/photos', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get('/api/photos/' + id, this.jwt()).map((response: Response) => response.json());
    }

    UpdateById(photoId: number, userId: number, like: boolean) {
        return this.http.put('/api/photos/' + photoId + '/' + userId + '/' + like, this.jwt()).map((response: Response) => response.json());
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