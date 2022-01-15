import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {take} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Picture} from '../models/picture.model';
import {NotificationService} from '../notification.service';
import {PictureService} from '../picture.service';

@Component({
  selector: 'app-picture-view-dialog',
  templateUrl: './picture-view-dialog.component.html',
  styleUrls: ['./picture-view-dialog.component.css']
})
export class PictureViewDialogComponent implements OnInit {
  picture!: Picture;
  isOwner = false

  constructor(
    public dialogRef: MatDialogRef<PictureViewDialogComponent>,
    private authService: AuthService,
    private pictureService: PictureService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: Picture
  ) { 
    this.picture = data
    this.authService.user.pipe(take(1)).subscribe(u => {
      if(u) 
        this.isOwner = u.name == this.picture.uploader
      else
        this.isOwner = false
    })
  }

  ngOnInit(): void {
  }

  like() {
    this.pictureService.likePicture(this.picture.path, !this.picture.isLiked).subscribe(
      _ => this.picture.isLiked = !this.picture.isLiked
    )
  }

  editTitle() {
    const newTitle = prompt("Enter new title:", 
                           this.picture.title? this.picture.title : "")
    this.pictureService.updateTitle(this.picture.path, newTitle? newTitle : "").subscribe({
      next: _ => { 
        this.picture.title = newTitle || '' 
        this.notificationService.notify('Successfully changed title!', 'success')
      },
      error: _ => {
        this.notificationService.notify('Failed to change title!', 'danger')
      }
    })
  }

  editDesc() {
    const newDesc = prompt("Enter new description:", 
                           this.picture.description? this.picture.description : "")
    this.pictureService.updateDesc(this.picture.path, newDesc? newDesc : "").subscribe({
      next: _ => { 
        this.picture.description = newDesc || '' 
        this.notificationService.notify('Successfully changed description!', 'success')
      },
      error: _ => {
        this.notificationService.notify('Failed to change description!', 'danger')
      }
    })
  }

  editTags() {
    const newTags = prompt("Enter new tags:", this.picture.hashtags.join(' ')) || ''
    const newTagsData = newTags.split(' ').join('|')
    this.pictureService.updateTags(this.picture.path, newTagsData? newTagsData : "").subscribe({
      next: _ => { 
        this.picture.hashtags = newTags.split(' ') 
        this.notificationService.notify('Successfully changed tags!', 'success')
      },
      error: _ => {
        this.notificationService.notify('Failed to change tags!', 'danger')
      }
    })
  }

  editPeople() {
    const newPpl = prompt("Enter new tagged people list:", this.picture.taggedUsers.join(' ')) || ''
    const newPplData = newPpl.split(' ').join('|')
    this.pictureService.updatePeople(this.picture.path, newPplData? newPplData : "").subscribe({
      next: _ => { 
        this.picture.taggedUsers = newPpl.split(' ') 
        this.notificationService.notify('Successfully changed tagged users!', 'success')
      },
      error: _ => {
        this.notificationService.notify('Error: Failed to change tagged users!', 'danger')
      }
    })
  }

  deletePhoto() {
    if(confirm("Are you sure you want to delete this photo?"))
      this.pictureService.deletePicture(this.picture.path).subscribe({
        next: _ => { 
          this.dialogRef.close() 
          this.notificationService.notify('Successfully deleted photo!', 'success')
        },
        error: _ => {
          this.notificationService.notify('Error: Failed to delete photo!', 'danger')
        }
      })
  }
}
