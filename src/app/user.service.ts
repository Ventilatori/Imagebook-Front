import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {APIPicture, Picture} from './models/picture.model';
import {User} from './models/user.model';

// TODO: Merge with APIUser
interface UserResult {
  userName: string,
  mail: string,
  userType: string,
  description?: string,
  profilePicture?: string,
  online: boolean
}

interface GetUserResponse {
  user: UserResult,
  uploadedPhotos: APIPicture[]
  taggedPhotos: APIPicture[]
}

function addUploader(name: string) {
  return (pic: APIPicture): Picture => {
    return {
      uploader: name,
      ...pic
    }
  }
}

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
    return this.http.get<GetUserResponse>('/api/API/GetUser/'+username).pipe(
      map(res => { 
        console.log(res)
        return {
          name: res.user.userName, 
          email: res.user.mail,
          picture: "/api/Images/Profile/" + (res.user.profilePicture? res.user.profilePicture : "default.png"),
          uploads: res.uploadedPhotos? res.uploadedPhotos.map(addUploader(res.user.userName)) : [],
          tagged: res.taggedPhotos? res.taggedPhotos.map(addUploader(res.user.userName)) : []
        }
      }))
  }

  follow(username: string, toggle: boolean) {
    if(toggle) 
      return this.http.post('/api/API/FollowUser/' + username, {})
    else
      return this.http.delete('/api/API/UnfollowUser/' + username)
  }
}
