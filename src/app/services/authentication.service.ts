import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
 
    login(username: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    getCurrentID(): number{
        if (localStorage.getItem('currentUser')) {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            return currentUser.id;
        }
        return 0
    }

    getCurrentUser(): User {
        if (localStorage.getItem('currentUser')) {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            return currentUser;
        }
        return null
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}