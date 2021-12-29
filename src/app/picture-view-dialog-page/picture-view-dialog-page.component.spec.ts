import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureViewDialogPageComponent } from './picture-view-dialog-page.component';

describe('PictureViewDialogPageComponent', () => {
  let component: PictureViewDialogPageComponent;
  let fixture: ComponentFixture<PictureViewDialogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureViewDialogPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureViewDialogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
