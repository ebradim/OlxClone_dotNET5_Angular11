import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
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
  constructor(private store: State<RootState>) {
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
    return this.isAuthenticated$.pipe(map((user) => !!!user));
  }
}
