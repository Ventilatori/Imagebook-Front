import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Location} from '@angular/common';
import {Picture} from '../models/picture.model';
import {PictureViewDialogComponent} from '../picture-view-dialog/picture-view-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css'],
})
export class PictureListComponent implements OnInit {
  @Input() pictures?: Picture[]

  constructor(
    public dialog: MatDialog,
    private location: Location,
    private router: Router
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
      else
        this.router.navigate(navigateTo)
    })
  }

  ngOnInit(): void {
  }
}
