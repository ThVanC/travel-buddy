import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-general-profile-info',
  templateUrl: './general-profile-info.component.html',
  styleUrls: ['./general-profile-info.component.css']
})
export class GeneralProfileInfoComponent implements OnInit {
  currentUser : User;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  }

  submit(){
    console.log("submitting!");
    this.alertService.success('hmmm');
    this.userService.update(this.currentUser)
      .subscribe(
        result => {
          this.router.navigate(['/profile']);
          console.log('succcess');
          this.alertService.success('user updated');
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        },
        error => {
          console.log('error');
          this.alertService.error(error);
          this.router.navigate(['/matches']);
        }
      );
  }

}
