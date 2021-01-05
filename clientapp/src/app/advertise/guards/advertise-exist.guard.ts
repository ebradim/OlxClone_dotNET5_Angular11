import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { fromAPIActions } from 'src/app/root/actions';
import { RootState } from 'src/app/root/reducers';
import { fromAdvertise } from '../actions';
import { IResponseAdvertise } from '../models/Advertise';
import { getSelectedAdvertiseIdEntity } from '../reducers';
import { AdvertiseService } from '../services/advertise.service';

@Injectable({
  providedIn: 'root',
})
export class AdvertiseExistGuard implements CanActivate {
  loadItemFromEntity$: Observable<'' | IResponseAdvertise | null | undefined>;

  constructor(
    private store: Store<RootState>,
    private advertiseService: AdvertiseService,
    private router: Router
  ) {
    this.loadItemFromEntity$ = this.store.pipe(
      select(getSelectedAdvertiseIdEntity)
    );
  }
  hasAdvertiseInStore(): Observable<boolean> {
    return this.loadItemFromEntity$.pipe(
      map((x) => !!x),
      take(1)
    );
  }

  hasAdvertiseInAPI(id: string): Observable<boolean> {
    return this.advertiseService.getAdvetise(id).pipe(
      map((advertise) =>
        fromAPIActions.loadAdvertiseFromAPISuccess({ advertise })
      ),
      tap((action) => this.store.dispatch(action)),
      tap((action) =>
        this.store.dispatch(
          fromAdvertise.selectAdvertise({
            uniqueId: action.advertise.userAdvertise.advertise.uniqueId,
          })
        )
      ),
      map((advertise) => !!advertise),
      catchError(() => {
        this.router.navigate(['./notfound']);
        return of(false);
      })
    );
  }

  isAdvertiseExist(id: string): Observable<boolean> {
    return this.hasAdvertiseInStore().pipe(
      switchMap((advertiseInStore) => {
        if (advertiseInStore) {
          return of(advertiseInStore);
        } else {
          return this.hasAdvertiseInAPI(id);
        }
      })
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isAdvertiseExist(route.params.id);
  }
}
