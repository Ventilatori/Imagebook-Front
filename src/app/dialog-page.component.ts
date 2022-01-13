import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Data, Router} from '@angular/router';

@Component({
  selector: 'app-dialog-page',
  template: '',
})
export class DialogPageComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      const dialog = data['dialog']
      const dialogData = data['dialogData']
      const dialogSize = data['dialogSize']

      const dialogRef = this.dialog.open(dialog, {
        autoFocus: false,
        maxWidth: dialogSize,
        data: dialogData,
      })

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route })
      })
    })
  }

}
