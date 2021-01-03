import { createAction, props } from '@ngrx/store';
import { IUser } from '../../auth/models/API';
import { IResponseAdvertise } from '../advertise/models/Advertise';

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
  props<{ advertises: IResponseAdvertise[] }>()
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
