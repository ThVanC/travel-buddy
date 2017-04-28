import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralProfileInfoComponent } from './general-profile-info.component';

describe('GeneralProfileInfoComponent', () => {
  let component: GeneralProfileInfoComponent;
  let fixture: ComponentFixture<GeneralProfileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralProfileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
