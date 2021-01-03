import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { fromAPIActions } from '../../actions';
import { AdvertiseService } from '../../advertise/services/advertise.service';
import { fromAdvertise } from '../actions';

@Injectable()
export class AdvertiseEffects {
  constructor(
    private route: Router,
    private advertiseService: AdvertiseService,
    private action$: Actions
  ) {}

  addAdertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAdvertise.addAdvertise),
      map((action) => action.advertise),
      switchMap((request) => {
        return this.advertiseService.addAdvetise(request).pipe(
          map((advertise) => fromAPIActions.addAdvertiseSuccess({ advertise })),
          catchError((error) => of(fromAPIActions.addAdvertiseError({ error })))
        );
      })
    )
  );

  afterPublishingAd$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAPIActions.addAdvertiseSuccess),
        tap(() => this.route.navigate(['/']))
      ),

    { dispatch: false }
  );
}
