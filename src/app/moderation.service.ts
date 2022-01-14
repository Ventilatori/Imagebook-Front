import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Picture} from './models/picture.model';

export interface ModeratedPicture {
  metadata: Picture,
  base64Content: BinaryData
}

@Injectable({providedIn: 'root'})
export class ModerationService {
  constructor(
    private http: HttpClient,
  ) { }

  getNext(): Observable<ModeratedPicture | {}> {
    return this.http.get('/api/Moderator/GetUnapprovedImage')
  }

  approvePicture(pic: ModeratedPicture) {
    return this.http.post('/api/Moderator/ApprovePhoto', pic)
  }
}
