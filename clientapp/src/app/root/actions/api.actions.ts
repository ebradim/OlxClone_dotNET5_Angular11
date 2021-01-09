import { createAction, props } from '@ngrx/store';
import {
  IResponseAdvertise,
  IResponseHomeAdvertise,
} from 'src/app/advertise/models/Advertise';
import { IUser } from '../../auth/models/API';

export const loginSuccess = createAction(
  '[API] Login Success',
  props<{ user: IUser }>()
);
export const loginError = createAction(
  '[API] Login Error',
  props<{ error: any }>()
);
export const registerSuccess = createAction(
  '[API] Register Success',
  props<{ user: IUser }>()
);
export const registerError = createAction(
  '[API] Register Error',
  props<{ error: any }>()
);
export const logoutSuccess = createAction(
  '[Logout] Logout Success',
  props<{ logout: boolean }>()
);
export const refreshTokenSuccess = createAction(
  '[Auth/User/Token] Refresh Token Success',
  props<{ user: IUser }>()
);
export const refreshTokenError = createAction(
  '[Auth/User/Token] Refresh Token Error',
  props<{ error: any }>()
);
export const loadHomeAdvertisesSuccess = createAction(
  '[Advertise/API/Home] Load Advertise Success',
  props<{ advertises: IResponseHomeAdvertise[] }>()
);
export const loadHomeAdvertisesError = createAction(
  '[Advertise/API/Home] Load Advertise Error',
  props<{ error: any }>()
);

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
