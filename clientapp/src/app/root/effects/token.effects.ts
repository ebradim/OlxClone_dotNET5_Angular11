import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { interval, Observable, of, timer } from 'rxjs';
import {
  catchError,
  delay,
  exhaustMap,
  map,
  mergeMap,
  repeat,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { fromAPIActions, fromTokenActions } from '../actions';
import { TokenService } from '../service/token.service';

@Injectable()
export class TokenEffects {
  constructor(private authService: TokenService, private action$: Actions) {}

  refreshToken$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromTokenActions.refreshToken),
      exhaustMap(() => {
        return this.authService.refreshToken().pipe(
          map((user) => fromAPIActions.refreshTokenSuccess({ user })),
          catchError((error) => of(fromAPIActions.refreshTokenError({ error })))
        );
      })
    )
  );
  tokenUpdate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          fromAPIActions.refreshTokenSuccess,
          fromAPIActions.registerSuccess,
          fromAPIActions.loginSuccess
        ),
        takeUntil(of(fromAPIActions.logoutSuccess)),
        switchMap(() => {
          return this.authService.refreshToken().pipe(
            delay(25000),
            map((user) => fromAPIActions.refreshTokenSuccess({ user })),
            catchError((error) =>
              of(fromAPIActions.refreshTokenError({ error }))
            ),
            repeat()
          );
        })
      ),

    { dispatch: false }
  );
}
