import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Picture} from '../models/picture.model';
import {PictureService} from '../picture.service';

@Injectable({ providedIn: 'root' })
export class PictureListPageResolver implements Resolve<Picture[]> {
  constructor(private pictureService: PictureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Picture[]> {
    let extraData = ''
    if(route.url[1]) {
      extraData = route.url[1].path
    }
    return this.pictureService.getList(route.url[0].path, extraData);
  }
}
