import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IResponseAdvertise } from '../models/Advertise';

export const addAdvertiseSuccess = createAction(
  '[Advertise/API] Add Advertise Success',
  props<{ advertise: IResponseAdvertise }>()
);
export const addAdvertiseError = createAction(
  '[Advertise/API] Add Advertise Error',
  props<{ error: any }>()
);
export const loadAdvertiseFromAPISuccess = createAction(
  '[Advertise/API] Load Advertise API Success',
  props<{ advertise: IResponseAdvertise }>()
);
export const loadAdvertiseFromAPIError = createAction(
  '[Advertise/API] Load Advertise API Error',
  props<{ error: HttpErrorResponse }>()
);
export const deleteAdvertiseSuccess = createAction(
  '[Advertise/API] Delete Advertise Success',
  props<{ result: boolean }>()
);
export const deleteAdvertiseError = createAction(
  '[Advertise/API] Delete Advertise Error',
  props<{ error: any }>()
);
export const editAdvertiseSuccess = createAction(
  '[Advertise/API] Edit Advertise Success',
  props<{ advertise: IResponseAdvertise }>()
);
export const editAdvertiseError = createAction(
  '[Advertise/API] Edit Advertise Error',
  props<{ error: any }>()
);

export const addAdvertiseToFavSuccess = createAction(
  '[Advertise/API] Add Advertise To Fav Success',
  props<{ result: boolean }>()
);
export const addAdvertiseToFavError = createAction(
  '[Advertise/API] Add Advertise To Fav Error',
  props<{ error: any }>()
);
export const removeAdvertiseFromFavSuccess = createAction(
  '[Advertise/API] Remove Advertise From Fav Success',
  props<{ result: boolean }>()
);
export const removeAdvertiseFromFavError = createAction(
  '[Advertise/API] Remove Advertise From Fav Error',
  props<{ error: any }>()
);
export const likeAdvertiseSuccess = createAction(
  '[Advertise/API] Like Advertise Success',
  props<{ result: boolean }>()
);
export const likeAdvertiseError = createAction(
  '[Advertise/API] Like Advertise Error',
  props<{ error: any }>()
);
