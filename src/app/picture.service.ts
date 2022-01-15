import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {APIPicture, Picture} from './models/picture.model';

function convertFromAPI(pic: APIPicture): Picture {
  return {
    ...pic,
    taggedUsers: pic.taggedUsers? pic.taggedUsers.split('|') : [],
    hashtags: pic.hashtags? pic.hashtags.split('|') : [],
  }
}

@Injectable({ providedIn: 'root' })
export class PictureService {
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
    data.append('Hashtags', tags.join(" "))
    data.append('TaggedUsers', users.join(" "))
    return this.http.post('/api/Image/AddPhoto', data)
  }

  likePicture(path: string, like: boolean) {
    if(like) {
      return this.http.post('/api/Image/LikePhoto/'+path, {})
    } else {
      return this.http.delete('/api/Image/UnlikePhoto/'+path)
    }
  }

  updateTitle(path: string, title: string) {
    //this.http.post('/api/API/test', JSON.stringify('testing'), {headers: { 'Content-Type': 'application/json' }}).subscribe(() => {})
    return this.http.put('/api/Image/UpdateTitle/' + path, title)
  }

  updateDesc(path: string, desc: string) {
    return this.http.put('/api/Image/UpdateDescription/' + path, desc)
  }

  updateTags(path: string, tags: string) {
    return this.http.put('/api/Image/UpdateHashtags/' + path, tags)
  }

  updatePeople(path: string, people: string) {
    return this.http.put('/api/Image/UpdateTaggedPeople/' + path, people)
  }

  deletePicture(path: string) {
    return this.http.delete('/api/Image/DeletePhoto/' + path)
  }
}
