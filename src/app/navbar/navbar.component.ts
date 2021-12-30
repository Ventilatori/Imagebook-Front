import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AuthDialogComponent, AuthType} from '../auth-dialog/auth-dialog.component';
import {AuthService} from '../auth/auth.service';
import {UploadDialogComponent} from '../upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  AuthType = AuthType
  loggedIn = false;
  subUser!: Subscription

  constructor(
    public dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.subUser = this.authService.user.subscribe(user => {
      this.loggedIn = !!user
    })
  }

  ngOnDestroy() {
    this.subUser.unsubscribe()
  }

  onAuth(type: AuthType): void {
    this.dialog.open(AuthDialogComponent, {
      width: '250px',
      data: {type: type},
    });
  }

  onUpload(): void {
    this.dialog.open(UploadDialogComponent, {
      width: '80%',
      maxWidth: '500px',
    });
  }
}
