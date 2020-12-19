import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fromAPIActions, fromLoginActions } from '../actions';
import { AuthService } from '../services/auth.service';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { ILogin } from '../models/Login';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private action$: Actions,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.login),
      map((action) => action.user),
      exhaustMap((user: ILogin) =>
        this.authService.login(user).pipe(
          map((user) => fromAPIActions.loginSuccess({ user })),
          catchError((error) => of(fromAPIActions.loginError({ error })))
        )
      )
    )
  );

  afterLogin$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAPIActions.loginSuccess),
        tap(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );
}
