import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PictureListPageResolver} from './picture-list-page/picture-list-page.resolver';
import {PictureListPageComponent} from './picture-list-page/picture-list-page.component';
import {PictureResolver} from './picture-view-dialog/picture.resolver';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {UserResolver} from './profile-page/user.resolver';
import {DialogPageComponent} from './dialog-page.component';
import {PictureViewDialogComponent} from './picture-view-dialog/picture-view-dialog.component';
import {VerifyDialogComponent} from './auth/verify-dialog/verify-dialog.component';

const picViewChild = { 
  path: ':id', 
  component: DialogPageComponent, 
  resolve: { dialogData: PictureResolver }, 
  data: { dialog: PictureViewDialogComponent, dialogSize: '45%' }
}

const routes: Routes = [
  { path: '', pathMatch: 'full',redirectTo: 'newest'  },
  { path: 'feed', component: PictureListPageComponent, resolve: { pictures: PictureListPageResolver }, children: [ picViewChild ]},
  { path: 'newest', component: PictureListPageComponent, resolve: { pictures: PictureListPageResolver }, children: [ picViewChild ]},
  { path: 'top', component: PictureListPageComponent, resolve: { pictures: PictureListPageResolver }, children: [ picViewChild ]},
  { path: 'tag/:id', component: PictureListPageComponent, resolve: { pictures: PictureListPageResolver }, children: [ picViewChild ] },
  { path: 'favorites', component: PictureListPageComponent, resolve: { pictures: PictureListPageResolver }, children: [ picViewChild ] },
  { path: 'user/:name', component: ProfilePageComponent, resolve: { user: UserResolver }, children: [ picViewChild ] },
  { path: 'verify/:id', component: DialogPageComponent, data: { dialog: VerifyDialogComponent, dialogSize: '300px', dialogData: true, dialogRoute: true }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
