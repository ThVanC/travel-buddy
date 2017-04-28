import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private userId: number;
  private user: User;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.userId = +params['id']; // (+) converts string 'id' to a number
    });
    console.log(this.userId);
    if(this.userId === undefined || this.userId === 0 || isNaN(this.userId) ){
      this.user = this.authenticationService.getCurrentUser();
      this.userId = this.user.id;
    } else {
      this.userService.getById(this.userId)
        .subscribe(
          user => { 
            this.user = user; 
          },
          error => {}
        );
    }
  }

}
