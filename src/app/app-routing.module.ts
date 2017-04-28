import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import {LandingScreenComponent} from './landing-screen/landing-screen.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './authentication/login/login.component'
import { RegisterComponent } from './authentication/register/register.component'
import { ProfileComponent } from './profile/profile.component'
import { GeneralProfileInfoComponent } from './profile/general-profile-info/general-profile-info.component'
import { MatchesComponent } from './matches/matches.component'
import { ChatroomComponent } from './chatroom/chatroom.component'
import { LikeDislikePhotoComponent } from './profile/like-dislike-photo/like-dislike-photo.component'
import { PhotoSelectionComponent } from './profile/photo-selection/photo-selection.component'
import { AuthGuard } from './services/auth-guard.service'


const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
        path: 'landingScreen',
        component: LandingScreenComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'profile/:id',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'profileForm',
      component: GeneralProfileInfoComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'matches',
      component: MatchesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'photoselection',
      component: PhotoSelectionComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'chatroom/:id',
      component: ChatroomComponent,
      canActivate: [AuthGuard]
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
