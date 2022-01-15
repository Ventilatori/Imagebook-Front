import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Picture} from './models/picture.model';
import {APIUser, User} from './models/user.model';

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
  uploadedPhotos: Picture[]
  taggedPhotos: Picture[]
}

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
    return this.http.get<GetUserResponse>('/api/API/GetUser/'+username).pipe(
      map(res => { 
        return {
          name: res.user.userName, 
          email: res.user.mail,
          picture: "/api/Images/Profile/" + (res.user.profilePicture? res.user.profilePicture : "default.png"),
          uploads: res.uploadedPhotos? res.uploadedPhotos : [],
          tagged: res.taggedPhotos? res.taggedPhotos : []
        }
      }))
  }

  followUser(username: string, toggle: boolean) {
    if(toggle) 
      return this.http.post('/api/API/FollowUser/' + username, {})
    else
      return this.http.delete('/api/API/UnfollowUser/' + username)
  }

  followTag(tag: string, toggle: boolean) {
    if(toggle)
      return this.http.post('/api/API/FollowHashtag/' + tag, {})
    else
      return this.http.delete('/api/API/UnfollowHashtag/' + tag)
  }

  changeProfilePic(newPic: File) {
    const data = new FormData()
    data.append('File', newPic)
    return this.http.post('/api/API/UploadProfilePic', data)
  }

  search(query: string): Observable<APIUser[]> {
    return this.http.get<UserResult[]>('/api/API/Search/'+query).pipe(
      map(resList => {
        return resList.map(res => {
          return { 
            name: res.userName,
            email: res.mail,
            picture: "/api/Images/Profile/" + (res.profilePicture? res.profilePicture : "default.png")
          }
        })
      })
    )
  }
}
