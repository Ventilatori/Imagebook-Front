import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {Picture} from '../models/picture.model';

@Component({
  selector: 'app-picture-list-page',
  template: `
    <app-picture-list [pictures]="pictures"></app-picture-list>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./picture-list-page.component.css']
})
export class PictureListPageComponent implements OnInit {
  pictures: Array<Picture> = []

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.pictures = data['pictures']
    })
  }

}
