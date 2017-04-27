import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeDislikePhotoComponent } from './like-dislike-photo.component';

describe('LikeDislikePhotoComponent', () => {
  let component: LikeDislikePhotoComponent;
  let fixture: ComponentFixture<LikeDislikePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeDislikePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeDislikePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
