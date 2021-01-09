import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  switchMap,
  throttleTime,
} from 'rxjs/operators';
import { fromFavoriteAdvertisesActions, fromUserAPIActions } from '../actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  constructor(private userService: UserService, private action$: Actions) {}

  getFavoriteAdvertises = createEffect(() =>
    this.action$.pipe(
      ofType(fromFavoriteAdvertisesActions.getFavoriteAdvertises),
      map((action) => action),
      switchMap(() => {
        return this.userService.getFavoriteAdvertises().pipe(
          map((favorites) =>
            fromUserAPIActions.getFavoriteAdvertisesSuccess({ favorites })
          ),
          catchError((error) =>
            of(fromUserAPIActions.getFavoriteAdvertisesError({ error }))
          )
        );
      })
    )
  );
  removeFromFavoriteAdertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromFavoriteAdvertisesActions.removeAdvertisesFromFavorite),
      map((action) => action),
      exhaustMap(({ uniqueId }) => {
        return this.userService.removeAdvetiseFromFavorite(uniqueId).pipe(
          throttleTime(5000),
          map((result) =>
            fromUserAPIActions.removeAdvertisesFromFavoriteSuccess({ result })
          ),
          catchError((error) =>
            of(fromUserAPIActions.removeAdvertisesFromFavoriteError({ error }))
          )
        );
      })
    )
  );
}
