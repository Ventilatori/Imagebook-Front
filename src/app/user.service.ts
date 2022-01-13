import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {User} from './models/user.model';

// Temporary
interface UserResult {
  name: {
    first: string
  },
  email: string,
  picture: {
    large: string,
    medium: string,
    thumbnail: string
  }
}

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<User> {
    //return of(new User(id, "test", "test@test.com"))
    return this.http.get<{results: UserResult[]}>('https://randomuser.me/api').pipe(
      map(resArr => resArr.results[0]),
      map(res => { 
        console.log(res)
        return {
          id: id,
          name: res.name.first, 
          email: res.email,
          picture: res.picture.large,
          uploads: [
            {
              id:"1",
              title:"Desk Fan",
              url:res.picture.large,
              uploader:res.name.first,
              likes:0,
              views:0
            },
          ],
          tagged: [

          ] 
        }
      }))
  }
}
