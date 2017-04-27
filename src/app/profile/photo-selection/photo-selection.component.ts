import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-photo-selection',
  templateUrl: './photo-selection.component.html',
  styleUrls: ['./photo-selection.component.css']
})
export class PhotoSelectionComponent implements OnInit {

  loading : boolean = true;
  selectionProcedureOnGoing : boolean = true;
  photos: Photo[];
  currentPhoto: Photo;
  index: number = 0;

  constructor(
      private photoService: PhotoService,
      private alertService: AlertService,
      private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    this.photoService.getAll()
        .subscribe(
            photos => {
               // set success message and pass true paramater to persist the message after redirecting to the login page
               this.photos = photos;
               if(this.photos.length === 0){
                this.alertService.success('No photo\'s found. Please try again later.', true);
                this.selectionProcedureOnGoing = false;
               } else {
                 this.alertService.success('Photos found', true);
                this.currentPhoto = this.photos[this.index];
                this.selectionProcedureOnGoing = true;
               }
               this.loading = false;
           },
           error => {
               this.alertService.error(error);
               this.loading = false;
               this.selectionProcedureOnGoing = false;
           });
  }

  handleLikeOrDislike(likeCurrentPhoto: boolean){
    this.photoService.UpdateById(this.currentPhoto.id, this.authenticationService.getCurrentID(), likeCurrentPhoto)
    .subscribe(
      () => {
        this.alertService.success('Photo is updated', true);
        this.showNextPhotoIfPossible();
      },
      error => {
        this.alertService.error(error);
        this.selectionProcedureOnGoing = false;
      }
    );
  }

  showNextPhotoIfPossible(){
    this.index++;
    if(this.index < this.photos.length){
      this.currentPhoto = this.photos[this.index];
    } else {
      this.selectionProcedureOnGoing = false;
    }
  }

}
