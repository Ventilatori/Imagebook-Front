import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthDialogComponent, AuthType} from './auth-dialog/auth-dialog.component';
import {UploadDialogComponent} from './upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  AuthType = AuthType
  title = 'nbp1';
  loggedIn = false;

  constructor(public dialog: MatDialog) {}

  onAuth(type: AuthType): void {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '250px',
      data: {type: type},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.loggedIn = true
      }
    });
  }

  onUpload(): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '80%',
      maxWidth: '500px',
    });

    dialogRef.afterClosed().subscribe(result => result);
  }
}
