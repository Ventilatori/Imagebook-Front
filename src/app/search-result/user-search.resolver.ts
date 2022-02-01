import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import {Result} from '../search-result/search-result.component';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserSearchResolver implements Resolve<Result[]> {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result[]> {
    return this.userService.search(route.params['query']).pipe(
      map(userList => {
        return userList.map(user => {
          return {
            title: user.name,
            img: user.picture,
            click: () => this.router.navigate(['/user', user.name])
          }
        })
      })
    )
  }
}
