import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Subscription, take} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {User} from '../models/user.model';
import {NotificationService} from '../notification.service';
import {PictureService} from '../picture.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  user!: User
  isOwner = false
  //TODO: Get these from the request
  isFriend = false

  picDelSubscription!: Subscription

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private pictureService: PictureService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.user = data['user']
      this.authService.user.pipe(take(1)).subscribe(u => {
        this.isOwner = (!!u && u.name == this.user.name)
      })
    })
    this.picDelSubscription = this.pictureService.pictureDeleted.subscribe(
      path => {
        if(this.user) {
          this.user.uploads = this.user.uploads.filter(pic => pic.path != path)
          this.user.tagged = this.user.tagged.filter(pic => pic.path != path)
        }
      }
    )
  }

  ngOnDestroy(): void {
    if(this.picDelSubscription)
      this.picDelSubscription.unsubscribe()
  }

  follow() {
    this.userService.followUser(this.user.name, !this.isFriend).subscribe({
      next: _ => { 
        this.isFriend = !this.isFriend
        this.notificationService.notify(`Successfully followed ${this.user.name}!`, 'success')
      },
      error: _ => this.notificationService.notify('Error: Failed to follow user!', 'danger')
    })
  }

  changeProfilePic(e: Event) {
    const input = e.target as HTMLInputElement
    if(input.files) {
      const file = input.files.item(0)
      if(file) {
        this.userService.changeProfilePic(file).subscribe({
          next: _ => {
            this.notificationService.notify('Changed profile picture successfully.', 'success')
          },
          error: _ => {
            this.notificationService.notify('Error: Failed to change profile picture.', 'danger')
          }
        })
      }
    }
  }

  logout() {
    this.authService.logout()
    this.notificationService.notify('You have logged out.', 'success')
  }
}
