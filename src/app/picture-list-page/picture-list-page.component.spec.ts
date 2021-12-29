import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureListPageComponent } from './picture-list-page.component';

describe('PictureListPageComponent', () => {
  let component: PictureListPageComponent;
  let fixture: ComponentFixture<PictureListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
