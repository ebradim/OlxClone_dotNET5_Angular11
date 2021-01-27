import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IResponseFilterAdvertise } from '../models/advertise';

export const loadAdvertisesSuccess = createAction(
  '[Explore/Filer] Load Advertise Success',
  props<{ advertise: IResponseFilterAdvertise }>()
);
export const filterByLastIdSuccess = createAction(
  '[Explore/Filer] Filter LastId Success',
  props<{ advertise: IResponseFilterAdvertise }>()
);

export const filterByCategorySuccess = createAction(
  '[Explore/Filer] Filter Category Success',
  props<{ advertise: IResponseFilterAdvertise }>()
);

export const filterByCategoryLastIdSuccess = createAction(
  '[Explore/Filer] Filter Category LastId Success',
  props<{ advertise: IResponseFilterAdvertise }>()
);

export const loadAdvertisesError = createAction(
  '[Explore/Filer] Load Advertise Error',
  props<{ error: HttpErrorResponse }>()
);
export const filterByLastIdError = createAction(
  '[Explore/Filer] Filter LastId Error',
  props<{ error: HttpErrorResponse }>()
);

export const filterByCategoryError = createAction(
  '[Explore/Filer] Filter Category Error',
  props<{ error: HttpErrorResponse }>()
);

export const filterByCategoryLastIdError = createAction(
  '[Explore/Filer] Filter Category LastId Error',
  props<{ error: HttpErrorResponse }>()
);
