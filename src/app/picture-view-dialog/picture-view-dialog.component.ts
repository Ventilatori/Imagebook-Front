import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Picture} from '../models/picture.model';

@Component({
  selector: 'app-picture-view-dialog',
  templateUrl: './picture-view-dialog.component.html',
  styleUrls: ['./picture-view-dialog.component.css']
})
export class PictureViewDialogComponent implements OnInit {
  picture!: Picture;

  constructor(
    public dialogRef: MatDialogRef<PictureViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Picture
  ) { 
    this.picture = data
  }

  ngOnInit(): void {
  }

}
