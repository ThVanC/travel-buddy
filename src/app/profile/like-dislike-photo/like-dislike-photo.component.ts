import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-like-dislike-photo',
  templateUrl: './like-dislike-photo.component.html',
  styleUrls: ['./like-dislike-photo.component.css']
})
export class LikeDislikePhotoComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() photo : Photo; 
  @Output() likes = new EventEmitter<boolean>();

  ngOnInit() {
    //this.router.navigate(["home"]);
  }

  like(): void{
    this.likes.emit(true);
  }

  dislike(): void{
    this.likes.emit(false);
  }

}
