import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { asyncScheduler, EMPTY, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  exhaustMap,
  map,
  skip,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { fromAdvertise } from 'src/app/advertise/actions';
import { AdvertiseService } from 'src/app/advertise/services/advertise.service';
import { fromAPIActions, fromHomeActions } from '../../actions';

@Injectable()
export class HomeEffects {
  constructor(
    private notification: NzNotificationService,
    private homeService: AdvertiseService,
    private advertiseService: AdvertiseService,
    private action$: Actions,
    private router: Router
  ) {}

  loadHomeAds$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromHomeActions.loadHomeAdvertises),
      exhaustMap(() => {
        return this.homeService.loadHomeAds().pipe(
          map((advertises) =>
            fromAPIActions.loadHomeAdvertisesSuccess({ advertises })
          ),
          catchError((error) =>
            of(fromAPIActions.loadHomeAdvertisesError({ error }))
          )
        );
      })
    )
  );

  searchForAdvertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromHomeActions.searchForAdvertises),
      debounceTime(1000, asyncScheduler),
      switchMap(({ term }) => {
        if (term.length === 0 || term === undefined || term === '') {
          return EMPTY;
        }

        const next$ = this.action$.pipe(
          ofType(fromHomeActions.searchForAdvertises),
          skip(1)
        );
        return this.advertiseService.searchForAdvertise(term).pipe(
          takeUntil(next$),
          map((result) => fromAPIActions.searchForAdvertisesSuccess({ result }))
        );
      })
    )
  );

  errorCatch$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAPIActions.loadHomeAdvertisesError),
        tap(() =>
          this.notification.error(
            'Unable to connect to host',
            'Our host is temporary down, Please try again in few mintues',
            { nzPlacement: 'bottomLeft' }
          )
        )
      ),

    { dispatch: false }
  );

  // onSelectAdvertise$ = createEffect(
  //   () =>
  //     this.action$.pipe(
  //       ofType(fromAdvertise.selectAdvertise),
  //       tap((advertise) =>
  //         this.router.navigate(['/advertise', advertise.uniqueId])
  //       )
  //     ),

  //   { dispatch: false }
  // );
}
