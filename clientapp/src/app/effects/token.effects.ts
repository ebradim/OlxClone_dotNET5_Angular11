import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
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
}
