import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {APIPicture} from './models/picture.model';

export interface ModeratedPicture {
  metadata: APIPicture,
  base64Content: BinaryData
}

@Injectable({providedIn: 'root'})
export class ModerationService {
  constructor(
    private http: HttpClient,
  ) { }

  getNext(): Observable<ModeratedPicture> {
    return this.http.get<ModeratedPicture>('/api/Moderator/GetUnapprovedImage')
  }

  approvePicture(pic: ModeratedPicture) {
    return this.http.post('/api/Moderator/ApprovePhoto', pic)
  }
}
