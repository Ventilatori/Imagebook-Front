import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Picture} from '../models/picture.model';
import {PictureViewDialogComponent} from '../picture-view-dialog/picture-view-dialog.component';

@Component({
  selector: 'app-moderation-dialog',
  templateUrl: './moderation-dialog.component.html',
  styleUrls: ['./moderation-dialog.component.css']
})
export class ModerationDialogComponent implements OnInit {
  // Change to moderation picture since it needs to be base64
  picture: Picture | null = null
  // Temporary
  tags = []
  people = []

  constructor(
    public dialogRef: MatDialogRef<PictureViewDialogComponent>,
    // ModerationService
    @Inject(MAT_DIALOG_DATA) public data: null
  ) {
  }

  ngOnInit(): void {
    // ModerationService getPhotoFromQueue, if empty wait 5s then reload
  }

}
