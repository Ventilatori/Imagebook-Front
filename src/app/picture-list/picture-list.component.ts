import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {Picture} from '../models/picture.model';
import {PictureViewDialogComponent} from '../picture-view-dialog/picture-view-dialog.component';
import {Router} from '@angular/router';
import {PictureService} from '../picture.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css'],
})
export class PictureListComponent implements OnInit, OnDestroy {
  @Input() pictures?: Picture[]
  picDelSubscription!: Subscription

  constructor(
    public dialog: MatDialog,
    private location: Location,
    private router: Router,
    private pictureService: PictureService
  ) {}

  onPictureClick(pic: Picture): void {
    const dialogRef = this.dialog.open(PictureViewDialogComponent, {
      autoFocus: false,
      maxWidth: '45%',
      data: pic,
    })

    this.location.go(this.location.path() + '/' + pic.path)

    dialogRef.afterClosed().subscribe(navigateTo => {
      if(!navigateTo)
        this.location.back()
      else {
        this.router.navigate(navigateTo)
      }
    })
  }

  ngOnInit(): void {
    this.picDelSubscription = this.pictureService.pictureDeleted.subscribe(
      path => {
        if(this.pictures)
          this.pictures = this.pictures.filter(pic => pic.path != path)
      }
    )
  }

  ngOnDestroy(): void {
    if(this.picDelSubscription)
      this.picDelSubscription.unsubscribe()
  }
}
