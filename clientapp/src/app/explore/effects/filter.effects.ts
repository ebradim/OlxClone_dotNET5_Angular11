import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { fromFilter, fromFilterAPI } from '../actions';
import { FilterService } from '../services/filter.service';

@Injectable()
export class FilterEffects {
  constructor(private filterService: FilterService, private action$: Actions) {}

  loadAdvertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromFilter.loadAdvertises),
      switchMap(() => {
        return this.filterService.filterHomeAds().pipe(
          map((advertise) =>
            fromFilterAPI.loadAdvertisesSuccess({ advertise })
          ),
          catchError((error) =>
            of(fromFilterAPI.loadAdvertisesError({ error }))
          )
        );
      })
    )
  );
  loadNextAdvertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromFilter.filterByLastId),
      map((action) => action.advertiseId),
      switchMap((id) => {
        return this.filterService.filterHomeByIdAds(id).pipe(
          map((advertise) =>
            fromFilterAPI.filterByLastIdSuccess({ advertise })
          ),
          catchError((error) =>
            of(fromFilterAPI.filterByLastIdError({ error }))
          )
        );
      })
    )
  );

  filterCategoryAdvertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromFilter.filterByCategory),
      map((action) => action),
      switchMap(({ category }) => {
        return this.filterService.filterCategoryAds(category).pipe(
          map((advertise) =>
            fromFilterAPI.filterByCategorySuccess({ advertise })
          ),
          catchError((error) =>
            of(fromFilterAPI.filterByCategoryError({ error }))
          )
        );
      })
    )
  );

  filterCategoryByLastIdAdvertise$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromFilter.filterByCategoryLastId),
      map((action) => action),
      switchMap(({ lastId, category }) => {
        return this.filterService.filterCategoryByIdAds(lastId, category).pipe(
          map((advertise) =>
            fromFilterAPI.filterByCategoryLastIdSuccess({ advertise })
          ),
          catchError((error) =>
            of(fromFilterAPI.filterByCategoryLastIdError({ error }))
          )
        );
      })
    )
  );
}
