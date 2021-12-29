import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureViewDialogComponent } from './picture-view-dialog.component';

describe('PictureViewDialogComponent', () => {
  let component: PictureViewDialogComponent;
  let fixture: ComponentFixture<PictureViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
