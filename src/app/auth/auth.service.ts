import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, exhaustMap, map, Observable, of} from 'rxjs';

export interface AuthUser {
  name: string
  email: string
  token: string
};

interface LogInResponse {
  userName: string
  name: string
  cookie: string
  profilePicture: string
  description?: string
};

// Separate into shared folder
interface Message {
  message: string
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<AuthUser | null>(null)

  constructor(private http: HttpClient) { }

  getFromStorage() {
    const auth = localStorage.getItem("auth")
    if(auth) { 
      const obj = JSON.parse(auth)
      this.user.next(obj)
    }
  }

  login(email: string, password: string): Observable<AuthUser> {
    const formData = new FormData()
    formData.append("mail", email)
    formData.append("password", password)
    return this.http.post<LogInResponse>('/api/Account/LogIn', formData).pipe(exhaustMap(loginRes => {
      const user: AuthUser = {
        name: loginRes.userName, 
        email: email, 
        token: loginRes.cookie
      }
      this.user.next(user)
      localStorage.setItem("auth", JSON.stringify(user))
      console.log(user)
      return of(user)
    }))
  }

  logout() {
    this.http.post('/api/Account/LogOut', {}).subscribe(_ => {})
    localStorage.removeItem("auth")
    this.user.next(null)
  }

  register(email: string, username: string, password: string): Observable<boolean> {
    const formData = new FormData()
    formData.append("mail", email)
    formData.append("userName", username)
    formData.append("password", password)
    return this.http.post<Message>('/api/Account/Register', formData).pipe(
      exhaustMap(_ => {
        return of(true)
      })
    )
  }

  verify(id: string): Observable<Message> {
    return this.http.post<Message>('/api/Account/Verify/'+id, {})
  }
}
