import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  exhaustMap,
  map,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs/operators';
import { fromAPIActions } from 'src/app/root/actions';
import { AdvertiseService } from '../../advertise/services/advertise.service';
import { fromAdvertise } from '../actions';
import { AdvertiseModule } from '../advertise.module';

@Injectable()
export class AdvertiseEffects {
  constructor(
    private route: Router,
    private advertiseService: AdvertiseService,
    private action$: Actions,
    private notification: NzNotificationService
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
  deleteAdertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAdvertise.deleteAdvertise),
      map((action) => action.uniqueId),
      exhaustMap((id) => {
        return this.advertiseService.deleteAdvetise(id).pipe(
          throttleTime(5000),
          map((result) => fromAPIActions.deleteAdvertiseSuccess({ result })),
          catchError((error) =>
            of(fromAPIActions.deleteAdvertiseError({ error }))
          )
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

  afterDeletingAd$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAPIActions.deleteAdvertiseSuccess),
        tap(() => this.route.navigate(['/']))
      ),

    { dispatch: false }
  );

  afterDeletingErrorAd$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAPIActions.deleteAdvertiseError),
        tap(() => {
          this.notification.error(
            'Something went wrong',
            'Error occured while deleting advertise',
            { nzPlacement: 'bottomLeft' }
          );
          this.route.navigate(['/']);
        })
      ),

    { dispatch: false }
  );
}
