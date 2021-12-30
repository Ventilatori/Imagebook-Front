import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {PictureViewDialogComponent} from '../picture-view-dialog/picture-view-dialog.component';

@Component({
  selector: 'app-picture-view-page',
  template: '',
})
export class PictureViewPageComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      const pic = data['picture']

      const dialogRef = this.dialog.open(PictureViewDialogComponent, {
        autoFocus: false,
        maxWidth: '45%',
        data: pic,
      })

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route })
      })
    })
  }

}
