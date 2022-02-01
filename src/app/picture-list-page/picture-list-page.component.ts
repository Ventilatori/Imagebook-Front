import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Picture} from '../models/picture.model';
import {NotificationService} from '../notification.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-picture-list-page',
  template: `
    <div fxLayout="row" fxLayoutAlign="start center">
      <h1>{{page | titlecase}}</h1>
      <button mat-raised-button color="accent" *ngIf="type=='tag'" (click)="followTag()">
        Follow
      </button>
    </div>
    <app-picture-list [pictures]="pictures"></app-picture-list>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./picture-list-page.component.css']
})
export class PictureListPageComponent implements OnInit {
  pictures: Picture[] = []
  page: string = ""
  type: string = ""
  extraData: string = ""

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.pictures = data['pictures']
    })
    this.route.url.subscribe(url => {
      this.type = url[0].toString()
      if(this.type == "tag") {
        this.extraData = url[1].toString()
        this.page = "#" + this.extraData
      } else {
        this.page = this.type
      }
    })
  }
  
  followTag() {
    this.userService.followTag(this.extraData, true).subscribe(
      () => { this.notificationService.notify('Successfully followed tag!', 'success') }
    )
  }
}
