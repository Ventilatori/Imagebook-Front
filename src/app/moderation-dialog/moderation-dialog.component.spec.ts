import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationDialogComponent } from './moderation-dialog.component';

describe('ModerationDialogComponent', () => {
  let component: ModerationDialogComponent;
  let fixture: ComponentFixture<ModerationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModerationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
