import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, Subject} from 'rxjs';
import {APIPicture, Picture} from './models/picture.model';

export function convertFromAPI(pic: APIPicture): Picture {
  return {
    ...pic,
    taggedUsers: pic.taggedUsers? pic.taggedUsers.split('|') : [],
    hashtags: pic.hashtags? pic.hashtags.split('|') : [],
  }
}

@Injectable({ providedIn: 'root' })
export class PictureService {
  pictureDeleted = new Subject<string>()

  constructor(private http: HttpClient) { }

  getFeed(): Observable<Picture[]> {
    return this.http.get<APIPicture[]>('/api/API/GetFeed24h').pipe(
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
    return this.http.get<APIPicture>('/api/API/GetPhoto/' + id).pipe(
      map(apipic => convertFromAPI(apipic))
    )
  }

  uploadPicture(title: string, description: string, tags: string[], users: string[], file: File) {
    const data = new FormData()
    data.append('Title', title)
    data.append('Picture', file)
    data.append('Description', description)
    data.append('Hashtags', tags.join("|"))
    data.append('TaggedUsers', users.join("|"))
    return this.http.post('/api/Image/AddPhoto', data)
  }

  likePicture(path: string, like: boolean) {
    if(like) {
      return this.http.post('/api/Image/LikePhoto/'+path, {})
    } else {
      return this.http.delete('/api/Image/UnlikePhoto/'+path)
    }
  }

  sendJsonString(url: string, str: string) {
    return this.http.put(url, 
                         JSON.stringify(str), 
                         {headers: { 'Content-Type': 'application/json' }})
  }

  updateTitle(path: string, title: string) {
    return this.sendJsonString('/api/Image/UpdateTitle/' + path, title)
  }

  updateDesc(path: string, desc: string) {
    return this.sendJsonString('/api/Image/UpdateDesc/' + path, desc)
  }

  updateTags(path: string, tags: string) {
    return this.sendJsonString('/api/Image/UpdateHtags/' + path, tags)
  }

  updatePeople(path: string, people: string) {
    return this.sendJsonString('/api/Image/UpdateTaggedP/' + path, people)
  }

  deletePicture(path: string) {
    this.pictureDeleted.next(path)
    return this.http.delete('/api/Image/DeletePhoto/' + path)
  }
}
