import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {APIPicture, Picture} from './models/picture.model';
import {APIUser} from './models/user.model';

interface PictureResponse {
  photo: APIPicture,
  user: APIUser
}

function convertFromAPI(e: PictureResponse): Picture {
  return {
    uploader: e.user.name,
    ...e.photo
  }
}

@Injectable({ providedIn: 'root' })
export class PictureService {
  constructor(private http: HttpClient) { }

  getFeed(): Observable<Picture[]> {
    return this.http.get<PictureResponse[]>('/api/API/GetFeed24h').pipe(
      map(picList => picList.map(convertFromAPI))
    )
  }

  getList(type: string, extraData = ''): Observable<Picture[]> {
    if(type == "feed")
      return this.getFeed()
    else
      return this.http.get<Picture[]>('http://localhost:3000/pictures')
  }

  getPicture(id: string): Observable<Picture> {
    return this.http.get<Picture>('http://localhost:3000/pictures/' + id)
  }

  //TODO: Add title
  uploadPicture(title: string, description: string, tags: string[], users: string[], file: File) {
    const data = new FormData()
    data.append('Title', title)
    data.append('Picture', file)
    data.append('Description', description)
    data.append('Hashtags', tags.join(" "))
    data.append('TaggedUsers', users.join(" "))
    return this.http.post('/api/Image/AddPhoto', data)
  }
}
