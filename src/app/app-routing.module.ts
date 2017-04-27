import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './authentication/login/login.component'
import { RegisterComponent } from './authentication/register/register.component'
import { AuthGuard } from './services/auth-guard.service'


const routes: Routes = [
    { 
      path: '', 
      component: HomeComponent, 
      canActivate: [AuthGuard] 
    },
    { 
      path: 'login', 
      component: LoginComponent 
    },
    { 
      path: 'register', 
      component: RegisterComponent 
    },
 
    // otherwise redirect to home
    { 
      path: '**', 
      redirectTo: '' 
    }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }