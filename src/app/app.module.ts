import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { PictureListPageComponent } from './picture-list-page/picture-list-page.component';
import { PictureViewDialogComponent } from './picture-view-dialog/picture-view-dialog.component';
import { PictureViewDialogPageComponent } from './picture-view-dialog-page/picture-view-dialog-page.component';
import { PictureViewPageComponent } from './picture-view-page/picture-view-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthDialogComponent,
    UploadDialogComponent,
    NavbarComponent,
    PictureListComponent,
    PictureListPageComponent,
    PictureViewDialogComponent,
    PictureViewDialogPageComponent,
    PictureViewPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }