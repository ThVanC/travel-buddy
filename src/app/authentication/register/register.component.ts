import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';

import datetimepicker from 'eonasdan-bootstrap-datetimepicker';
import moment from 'moment';
 
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
    date: moment.Moment;
 
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }
 
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    dateChange(date) {
        this.date = date;
    }
    
    dateClick() {
        console.log('click click!')
    }
    
    getTime() {
        alert('Selected time is:' + this.date);
    };

    addTime(val, selector) {
        this.date = moment(this.date.add(val, selector));
    };

    clearTime() {
        this.date = null;
    };
}