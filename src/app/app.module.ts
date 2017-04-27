import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LikeDislikePhotoComponent } from './profile/like-dislike-photo/like-dislike-photo.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AlertComponent } from './helpers/alert/alert.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './services/auth-guard.service';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { PhotoService } from './services/photo.service';

import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MatchesComponent } from './matches/matches.component';
import { PhotoSelectionComponent } from './profile/photo-selection/photo-selection.component';



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LikeDislikePhotoComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent,
    NavbarComponent,
    MatchesComponent,
    PhotoSelectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    PhotoService,

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
