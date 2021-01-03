import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { fromAPIActions, fromHomeActions } from '../../actions';
import { AdvertiseService } from '../../advertise/services/advertise.service';

@Injectable()
export class HomeEffects {
  constructor(
    private notification: NzNotificationService,
    private homeService: AdvertiseService,
    private action$: Actions
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
}
