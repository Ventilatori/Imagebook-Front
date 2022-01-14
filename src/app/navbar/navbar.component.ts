import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {AuthDialogComponent, AuthType} from '../auth/auth-dialog/auth-dialog.component';
import {AuthService} from '../auth/auth.service';
import {UploadDialogComponent} from '../upload-dialog/upload-dialog.component';

enum Position {
  Left,
  Right
}

interface Link {
  name: string,
  link?: string,
  click?: () => any,
  icon: string,
  loggedIn?: boolean,
  pos: Position,
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  AuthType = AuthType
  Position = Position
  loggedIn = false;
  subUser!: Subscription

  allLinks: Link[] = [
    { name: "Feed", link: "/feed", icon: "explore", loggedIn: true, pos: Position.Left },
    { name: "Newest", link: "/newest", icon: "query_builder", pos: Position.Left },
    { name: "Top", link: "/top", icon: "emoji_events", pos: Position.Left },
    { name: "Tag", link: "/tag/test", icon: "tag", pos: Position.Left },
    { name: "Favorites", link: "/favorites", icon: "favorite", loggedIn: true, pos: Position.Left },
    { name: "Login", click: () => this.onAuth(AuthType.Login), icon: "login", loggedIn: false, pos: Position.Right },
    { name: "Register", click: () => this.onAuth(AuthType.Register), icon: "person_add", loggedIn: false, pos: Position.Right },
    { name: "Upload", click: () => this.onUpload(), icon: "upload", loggedIn: true, pos: Position.Right },
    { name: "Profile", click: () => this.authService.logout(), icon: "person", loggedIn: true, pos: Position.Right },
  ]
  links: Link[] = []

  constructor(
    public dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.subUser = this.authService.user.subscribe(user => {
      this.loggedIn = !!user
      this.links = this.allLinks.filter(l => l.loggedIn === undefined || l.loggedIn === this.loggedIn)
    })
  }

  ngOnDestroy() {
    this.subUser.unsubscribe()
  }

  getLinksForPosition(pos: Position) {
    return this.links.filter(l => l.pos === pos) 
  }

  onAuth(type: AuthType): void {
    this.dialog.open(AuthDialogComponent, {
      width: '250px',
      data: type,
    });
  }

  onUpload(): void {
    this.dialog.open(UploadDialogComponent, {
      width: '80%',
      maxWidth: '500px',
    });
  }
}
