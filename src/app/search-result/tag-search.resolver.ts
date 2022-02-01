import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import {UserService} from '../user.service';
import {Result} from './search-result.component';

@Injectable({providedIn: 'root'})
export class TagSearchResolver implements Resolve<Result[]> {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result[]> {
    return this.userService.searchTags(route.params['query']).pipe(
      map(tagList => {
        return tagList.map(tag => {
          return {
            title: tag.title,
            icon: 'tag',
            click: () => this.router.navigate(['/tag', tag.title])
          }
        })
      })
    )
  }
}
