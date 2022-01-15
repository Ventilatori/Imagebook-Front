import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {take} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {User} from '../models/user.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user!: User
  //TODO: Get these from the request
  isOwner = false
  isFriend = false

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.user = data['user']
      this.authService.user.pipe(take(1)).subscribe(u => {
        this.isOwner = (!!u && u.name == this.user.name) && false
      })
    })
  }

  follow() {
    this.userService.followUser(this.user.name, !this.isFriend).subscribe(
      _ => this.isFriend = !this.isFriend
    )
  }

  changeProfilePic(e: Event) {
    const input = e.target as HTMLInputElement
    if(input.files) {
      const file = input.files.item(0)
      if(file) {
        this.userService.changeProfilePic(file).subscribe(_ => {})
      }
    }
  }

  logout() {
    this.authService.logout()
  }
}
