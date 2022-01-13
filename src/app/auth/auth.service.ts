import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

export class AuthUser {
    constructor(
        public id: string, 
        public name: string, 
        public email: string,
        private _token: string,
        private _expiresAt: number
    ) {}

    static deserialize(obj: any) {
      return new AuthUser(
        obj.id,
        obj.name,
        obj.email,
        obj._token,
        obj._expiresAt
      )
    }

    get token() {
      if(this._expiresAt - new Date().getTime() > 0)
        return this._token
      else
        return null
    }
};

interface LogInRequest {
  mail: string
  password: string
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<AuthUser | null>(null)
  // Test data
  users = [
    new AuthUser("0", "Admin", "", "token0", Number.MAX_VALUE),
    new AuthUser("1", "Test", "", "token1", Number.MAX_VALUE),
    new AuthUser("2", "Test2", "", "token2", Number.MAX_VALUE)
  ]

  constructor() { }

  getFromStorage() {
    const auth = localStorage.getItem("auth")
    if(auth) { 
      const obj = JSON.parse(auth)
      this.user.next(AuthUser.deserialize(obj))
    }
  }

  login(username: string, password: string): Observable<AuthUser> {
    const res = this.users.filter(user => user.name == username) 
    if(res.length == 1) {
      this.user.next(res[0])
      localStorage.setItem("auth", JSON.stringify(res[0]))
      return of(res[0])
    }
    else {
      throw new Error("Failed to log in")
    }
  }

  logout() {
    localStorage.removeItem("auth")
    this.user.next(null)
  }

  register(email: string, username: string, password: string): Observable<AuthUser> {
    // Test data
    const user = new AuthUser(username, username, email, password, Number.MAX_VALUE)
    this.users.push(user)
    this.user.next(user)
    return of(user)
  }
}
