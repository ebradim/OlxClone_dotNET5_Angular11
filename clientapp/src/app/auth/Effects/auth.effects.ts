import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fromLoginActions,
  fromLogoutActions,
  fromRegisterActions,
} from '../actions';
import { fromAPIActions } from '../../root/actions';
import { AuthService } from '../services/auth.service';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { ILogin } from '../models/Login';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IRegister } from '../models/Register';
@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private action$: Actions,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromRegisterActions.register),
      map((action) => action.user),
      exhaustMap((user: IRegister) =>
        this.authService.register(user).pipe(
          map((user) => fromAPIActions.registerSuccess({ user })),
          catchError((error) => of(fromAPIActions.registerError({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLogoutActions.logout),
      exhaustMap(() => {
        return this.authService
          .logout()
          .pipe(map((logout) => fromAPIActions.logoutSuccess({ logout })));
      })
    )
  );
  afterAuth$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAPIActions.loginSuccess, fromAPIActions.registerSuccess),
        tap(() => {
          if (
            this.activatedRoute.snapshot.queryParams.redirect === 'create-ad'
          ) {
            this.router.navigate(['/advertise/create']);
          } else if (this.activatedRoute.snapshot.queryParams.redirectView) {
            const id = this.activatedRoute.snapshot.queryParams.redirectView;
            this.router.navigate(['/advertise', id]);
          } else {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  afterLogout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAPIActions.logoutSuccess),
        tap(() => {
          this.router.navigate(['/auth/login']);
          window.location.reload();
        })
      ),
    { dispatch: false }
  );
}
