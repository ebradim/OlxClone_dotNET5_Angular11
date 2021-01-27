import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { select, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../../auth/models/API';
import { getCurrentUser, RootState } from '../reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuthenticated$: Observable<IUser | null>;
  constructor(private store: State<RootState>, private router: Router) {
    this.isAuthenticated$ = this.store.pipe(select(getCurrentUser));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (route.routeConfig?.path === 'user') {
      this.router.navigate(['/auth/login'], {
        queryParams: { redirect: 'user-fav' },
      });
      return this.isAuthenticated$.pipe(map((user) => !!user));
    } else {
      return this.isAuthenticated$.pipe(map((user) => !!!user));
    }
  }
}
