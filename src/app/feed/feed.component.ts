import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Picture} from '../models/picture.model';
import {APIUser} from '../models/user.model';
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

  friendRecs: APIUser[] = []
  // Default
  tagRecs: string[] = [
    'Funny', 'Cats', 'Cool', 'hehe'
  ]

  constructor(
    private pictureService: PictureService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
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

    this.userService.getRecommendedFriends().subscribe({
      next: list => {
        this.friendRecs = list
      },
      error: _ => {
        this.notificationService.notify('Error: Failed to fetch recommendations.', 'danger')
      }
    })
  }

  gotoPage(path: string[]) {
    this.router.navigate(path)
  }
}
