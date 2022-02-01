import { Component, OnInit } from '@angular/core';
import {Picture} from '../models/picture.model';
import {NotificationService} from '../notification.service';
import {PictureService} from '../picture.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  friendPics: Picture[] = []
  tagPics: Picture[] = []

  constructor(
    private pictureService: PictureService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.pictureService.getList('feed').subscribe({
      next: list => {
        this.friendPics = list
      },
      error: _ => {
        this.notificationService.notify('Error: Failed to fetch feed.', 'danger')
      }
    })

    this.pictureService.getList('followed-tags').subscribe({
      next: list => {
        this.tagPics = list
      },
      error: _ => {
        this.notificationService.notify('Error: Failed to fetch feed.', 'danger')
      }
    })
  }

}
