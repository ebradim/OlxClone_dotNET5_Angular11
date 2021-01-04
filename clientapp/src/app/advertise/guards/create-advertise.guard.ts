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
import { IUser } from 'src/app/auth/models/API';
import { getCurrentUser, RootState } from 'src/app/root/reducers';

@Injectable({
  providedIn: 'root',
})
export class CreateAdvertiseGuard implements CanActivate {
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
    return this.isAuthenticated$.pipe(
      map((user) => {
        if (!!user) {
          return true;
        } else {
          this.router.navigate(['/auth/login'], {
            queryParams: { redirect: 'create-ad' },
          });
          return false;
        }
      })
    );
  }
}
