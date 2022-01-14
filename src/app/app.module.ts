import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout';
import { AuthDialogComponent } from './auth/auth-dialog/auth-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { PictureListPageComponent } from './picture-list-page/picture-list-page.component';
import { PictureViewDialogComponent } from './picture-view-dialog/picture-view-dialog.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interceptor';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { VerifyDialogComponent } from './auth/verify-dialog/verify-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthDialogComponent,
    UploadDialogComponent,
    NavbarComponent,
    PictureListComponent,
    PictureListPageComponent,
    PictureViewDialogComponent,
    ProfilePageComponent,
    VerifyDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
