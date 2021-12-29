import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureViewPageComponent } from './picture-view-page.component';

describe('PictureViewPageComponent', () => {
  let component: PictureViewPageComponent;
  let fixture: ComponentFixture<PictureViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
