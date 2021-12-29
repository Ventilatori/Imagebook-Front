import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Picture} from './models/picture.model';

@Injectable({ providedIn: 'root' })
export class PictureService {
  pictures: Array<Picture> = [
    new Picture("1", "Desk Fan", "https://myhanabishi.com/wp-content/uploads/2020/03/space-16blue.jpg", "test"),
    new Picture("2", "CPU Fan", "https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/db/imgs/pdt/angle/CL-P049-AL09BL-A%20_df820df6cafc48fdbe106e52d5e4ef67.jpg", "admin"),
    new Picture("3", "Fan boy", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Fanboy_Nintendo.jpg/1200px-Fanboy_Nintendo.jpg", "unknown")
  ]

  pictures2: Array<Picture> = [
    new Picture("1", "Secret Fan", "https://myhanabishi.com/wp-content/uploads/2020/03/space-16blue.jpg", "test"),
  ]

  constructor() { }

  getList(type: string, extraData = ''): Observable<Picture[]> {
    if(type == "top")
      return of(this.pictures2)
    return of(this.pictures)
  }

  getPicture(id: string): Observable<Picture> {
    const res = this.pictures.filter(pic => pic.id == id) 
    if(res.length == 1) {
      return of(res[0])
    }
    else {
      throw new Error("PictureService.getPicture, expected 1 result, got: " + res.length)
    }
  }
}
