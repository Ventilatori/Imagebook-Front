import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModeratedPicture, ModerationService} from '../moderation.service';

@Component({
  selector: 'app-moderation-dialog',
  templateUrl: './moderation-dialog.component.html',
  styleUrls: ['./moderation-dialog.component.css']
})
export class ModerationDialogComponent implements OnInit {
  // Change to moderation picture since it needs to be base64
  picture: ModeratedPicture | null = null
  // Temporary
  tags = []
  people = []

  constructor(
    public dialogRef: MatDialogRef<ModerationDialogComponent>,
    private moderationService: ModerationService,
    @Inject(MAT_DIALOG_DATA) public data: null
  ) {
  }

  ngOnInit(): void {
    this.getNext()
  }

  approve() {
    if(this.picture) {
      this.moderationService.approvePicture(this.picture).subscribe(
        _ => {}
      )
    }
    this.getNext()
  }

  disapprove() {
    this.getNext()
  }

  getNext() {
    this.moderationService.getNext().subscribe(
      res => {
        if(res == {}) {
          setTimeout(() => this.getNext(), 5000) 
          this.picture = null
        }
        else {
          this.picture = res as ModeratedPicture
        }
      }
    )
  }
}
