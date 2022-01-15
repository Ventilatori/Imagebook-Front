import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModeratedPicture, ModerationService} from '../moderation.service';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-moderation-dialog',
  templateUrl: './moderation-dialog.component.html',
  styleUrls: ['./moderation-dialog.component.css']
})
export class ModerationDialogComponent implements OnInit, OnDestroy {
  picture: ModeratedPicture | null = null
  tags: string[] = []
  people: string[] = []
  timeoutRef: any = undefined

  constructor(
    public dialogRef: MatDialogRef<ModerationDialogComponent>,
    private moderationService: ModerationService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: null
  ) {
  }

  ngOnInit(): void {
    this.getNext()
  }

  ngOnDestroy(): void {
    if(this.timeoutRef) {
      clearTimeout(this.timeoutRef)
    }
  }

  approve() {
    if(this.picture) {
      this.moderationService.approvePicture(this.picture).subscribe({
        next: _ => {
          this.notificationService.notify('Photo approved!', 'success')
        },
        error: _ => {
          this.notificationService.notify('Error: Photo approval failed!', 'danger')
        }
      })
    }
    this.getNext()
  }

  disapprove() {
    this.getNext()
  }

  getNext() {
    this.moderationService.getNext().subscribe(
      res => {
        if(res && res.metadata != null) {
          this.picture = res
          this.tags = this.picture.metadata.hashtags.split('|')
          this.people = this.picture.metadata.taggedUsers.split('|')
          this.timeoutRef = undefined
        }
        else {
          this.timeoutRef = setTimeout(() => this.getNext(), 5000) 
          this.picture = null
          this.tags = []
          this.people = []
        }
      }
    )
  }
}
