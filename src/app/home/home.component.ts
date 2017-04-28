import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { User } from '../models/user';
import { UserService } from '../services/user.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
 
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    isProfileComplete: boolean;
 
    constructor(
        private router: Router,
        private userService: UserService) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.loadAllUsers();
        this.userService.isProfileComplete(this.currentUser.id)
            .subscribe(
                result => { this.isProfileComplete = result },
                error => {}
            );
        // if(this.isProfileComplete){
        //     this.router.navigate(['/profile']);
        // } else {
        //     this.router.navigate(['/profileForm']);
        // }
    }
 
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}