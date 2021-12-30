import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Picture} from './models/picture.model';

@Injectable({ providedIn: 'root' })
export class PictureService {
  constructor(private http: HttpClient) { }

  getList(type: string, extraData = ''): Observable<Picture[]> {
    let url = 'http://localhost:3000/pictures'
    if(type == "top")
      url += '2'
    return this.http.get<Picture[]>(url)
  }

  getPicture(id: string): Observable<Picture> {
    return this.http.get<Picture>('http://localhost:3000/pictures/' + id)
  }
}
