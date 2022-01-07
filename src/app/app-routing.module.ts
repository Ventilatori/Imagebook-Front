import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PictureListPageResolver} from './picture-list-page/picture-list-page.resolver';
import {PictureListPageComponent} from './picture-list-page/picture-list-page.component';
import {PictureResolver} from './picture-view-dialog/picture.resolver';
import {PictureViewPageComponent} from './picture-view-page/picture-view-page.component';

const picViewChild = 
  { path: ':id', component: PictureViewPageComponent, resolve: { picture: PictureResolver }}

const routes: Routes = [
  { path: '', pathMatch: 'full',redirectTo: 'newest'  },
  { path: 'feed', component: PictureListPageComponent, resolve: { pictures: PictureListPageResolver }, children: [ picViewChild ]},
  { path: 'newest', component: PictureListPageComponent, resolve: { pictures: PictureListPageResolver }, children: [ picViewChild ]},
  { path: 'top', component: PictureListPageComponent, resolve: { pictures: PictureListPageResolver }, children: [ picViewChild ]},
  { path: 'tag/:id', component: PictureListPageComponent, resolve: { pictures: PictureListPageResolver }, children: [ picViewChild ] },
  { path: 'favorites', component: PictureListPageComponent, resolve: { pictures: PictureListPageResolver }, children: [ picViewChild ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
