import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  exhaustMap,
  map,
  switchMap,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs/operators';
import { AdvertiseService } from '../../advertise/services/advertise.service';
import { fromAdvertise, fromAdvertiseAPI } from '../actions';
import { getConnecting } from '../reducers';

@Injectable()
export class AdvertiseEffects {
  id = '';
  constructor(
    private route: Router,
    private advertiseService: AdvertiseService,
    private action$: Actions,
    private notification: NzNotificationService,
    private message: NzMessageService
  ) {}

  addAdertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAdvertise.addAdvertise),
      map((action) => action.advertise),
      switchMap((request) => {
        return this.advertiseService.addAdvetise(request).pipe(
          map((advertise) =>
            fromAdvertiseAPI.addAdvertiseSuccess({ advertise })
          ),
          catchError((error) =>
            of(fromAdvertiseAPI.addAdvertiseError({ error }))
          )
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
          map((result) => fromAdvertiseAPI.deleteAdvertiseSuccess({ result })),
          catchError((error) =>
            of(fromAdvertiseAPI.deleteAdvertiseError({ error }))
          )
        );
      })
    )
  );
  editAdertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAdvertise.editAdvertise),
      map((action) => action),
      exhaustMap(({ uniqueId, advertise }) => {
        return this.advertiseService.editAdvetise(uniqueId, advertise).pipe(
          throttleTime(5000),
          map((advertise) =>
            fromAdvertiseAPI.editAdvertiseSuccess({ advertise })
          ),
          catchError((error) =>
            of(fromAdvertiseAPI.editAdvertiseError({ error }))
          )
        );
      })
    )
  );

  addToFavoriteAdertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAdvertise.addToFavorite),
      map((action) => action),
      exhaustMap(({ uniqueId }) => {
        return this.advertiseService.addAdvetiseToFavorite(uniqueId).pipe(
          throttleTime(5000),
          map((result) =>
            fromAdvertiseAPI.addAdvertiseToFavSuccess({ result })
          ),
          catchError((error) =>
            of(fromAdvertiseAPI.addAdvertiseToFavError({ error }))
          )
        );
      })
    )
  );

  removeFromFavoriteAdertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAdvertise.removeFromFavorite),
      map((action) => action),
      exhaustMap(({ uniqueId }) => {
        return this.advertiseService.removeAdvetiseFromFavorite(uniqueId).pipe(
          throttleTime(5000),
          map((result) =>
            fromAdvertiseAPI.removeAdvertiseFromFavSuccess({ result })
          ),
          catchError((error) =>
            of(fromAdvertiseAPI.removeAdvertiseFromFavError({ error }))
          )
        );
      })
    )
  );
  likeAdvertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAdvertise.likeAdvertise),
      map((action) => action),
      exhaustMap(({ uniqueId }) => {
        return this.advertiseService.likeAdvertise(uniqueId).pipe(
          throttleTime(5000),
          map((result) => fromAdvertiseAPI.likeAdvertiseSuccess({ result })),
          catchError((error) =>
            of(fromAdvertiseAPI.likeAdvertiseError({ error }))
          )
        );
      })
    )
  );
  afterPublishingAd$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          fromAdvertiseAPI.addAdvertiseSuccess,
          fromAdvertiseAPI.editAdvertiseSuccess
        ),
        tap(() => this.route.navigate(['/']))
      ),

    { dispatch: false }
  );

  afterDeletingAd$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAdvertiseAPI.deleteAdvertiseSuccess),
        tap(() => this.route.navigate(['/']))
      ),

    { dispatch: false }
  );

  afterDeletingErrorAd$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAdvertiseAPI.deleteAdvertiseError),
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

  onRequestingStart = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          fromAdvertise.removeFromFavorite,
          fromAdvertise.addToFavorite,
          fromAdvertise.deleteAdvertise,
          fromAdvertise.editAdvertise
        ),
        tap(() => {
          this.id = this.message.loading('Please wait...').messageId;
        })
      ),

    { dispatch: false }
  );
  onRequestingEnd = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          fromAdvertiseAPI.addAdvertiseSuccess,
          fromAdvertiseAPI.addAdvertiseToFavSuccess,
          fromAdvertiseAPI.deleteAdvertiseSuccess,
          fromAdvertiseAPI.removeAdvertiseFromFavSuccess,
          fromAdvertiseAPI.editAdvertiseSuccess,
          fromAdvertiseAPI.addAdvertiseError,
          fromAdvertiseAPI.addAdvertiseToFavError,
          fromAdvertiseAPI.deleteAdvertiseError,
          fromAdvertiseAPI.removeAdvertiseFromFavError,
          fromAdvertiseAPI.editAdvertiseError
        ),
        tap(() => {
          this.message.remove(this.id);
        })
      ),

    { dispatch: false }
  );
}
