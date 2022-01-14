import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {take} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Picture} from '../models/picture.model';
import {PictureService} from '../picture.service';

@Component({
  selector: 'app-picture-view-dialog',
  templateUrl: './picture-view-dialog.component.html',
  styleUrls: ['./picture-view-dialog.component.css']
})
export class PictureViewDialogComponent implements OnInit {
  picture!: Picture;
  tags = ['test']
  people = []
  isOwner = false

  constructor(
    public dialogRef: MatDialogRef<PictureViewDialogComponent>,
    private authService: AuthService,
    private pictureService: PictureService,
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
    this.pictureService.updateDesc(this.picture.path, newTitle? newTitle : "").subscribe(
      _ => {}
    )
  }

  editDesc() {
    const newDesc = prompt("Enter new description:", 
                           this.picture.description? this.picture.description : "")
    this.pictureService.updateDesc(this.picture.path, newDesc? newDesc : "").subscribe(
      _ => {}
    )
  }

  editTags() {
    //prompt("Enter new description:", this.picture.tags)
  }

  editPeople() {
    //prompt("Enter new description:", this.picture.people)
  }

  deletePhoto() {
    if(confirm("Are you sure you want to delete this photo?"))
      this.pictureService.deletePicture(this.picture.path).subscribe(
        _ => {}
      )
  }
}
