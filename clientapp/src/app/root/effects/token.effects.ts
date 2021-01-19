import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
import { fromAPIActions, fromHomeActions, fromTokenActions } from '../actions';
import { RootState } from '../reducers';
import { SignalRService } from '../service/signalr.service';
import { TokenService } from '../service/token.service';

@Injectable()
export class TokenEffects {
  constructor(
    private authService: TokenService,
    private action$: Actions,
    private route: Router,
    private notification: NzNotificationService,
    private signalr: SignalRService
  ) {}

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

  startWebsocket$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAPIActions.registerSuccess, fromAPIActions.loginSuccess),
        tap(() => this.signalr.runWebsocket())
      ),

    { dispatch: false }
  );

  stopWebsocket$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          fromAPIActions.logoutSuccess,
          fromAPIActions.loginError,
          fromAPIActions.registerError,
          fromAPIActions.refreshTokenError
        ),
        tap(() => this.signalr.connection?.stop())
      ),

    { dispatch: false }
  );
  tokenUpdate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          fromAPIActions.refreshTokenSuccess,
          fromAPIActions.registerSuccess,
          fromAPIActions.loginSuccess
        ),
        switchMap(() => {
          return this.authService.refreshToken().pipe(
            delay(250000),
            take(1),
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

  //          tap(() => this.store.dispatch(fromHomeActions.establishWebsocket())),

  onErrorAutoLogin = createEffect(
    () => () =>
      this.action$.pipe(
        ofType(fromAPIActions.refreshTokenError),
        tap(() => {
          this.notification.error(
            'Session is expired!',
            'You have been logged out due to long in-active\nIf you still facing this problem it may be our server problem, We will come back',
            { nzPlacement: 'bottomLeft', nzDuration: 10000 }
          );
          this.route.navigate(['/auth/login']);
        })
      ),

    { dispatch: false }
  );
}
