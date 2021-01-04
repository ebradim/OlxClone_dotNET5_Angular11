import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, delay, exhaustMap, map, tap } from 'rxjs/operators';
import { fromAdvertise } from 'src/app/advertise/actions';
import { AdvertiseService } from 'src/app/advertise/services/advertise.service';
import { fromAPIActions, fromHomeActions } from '../../actions';

@Injectable()
export class HomeEffects {
  constructor(
    private notification: NzNotificationService,
    private homeService: AdvertiseService,
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

  onSelectAdvertise$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAdvertise.selectAdvertise),
        tap((advertise) =>
          this.router.navigate(['/advertise', advertise.uniqueId])
        )
      ),

    { dispatch: false }
  );
}
