import { createAction, props } from '@ngrx/store';
import {
  IResponseAdvertise,
  IResponseHomeAdvertise,
} from 'src/app/advertise/models/Advertise';
import { IUser } from '../../auth/models/API';
import { IGroupedAdvertise } from '../home/models/SearchAdvertise';

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
export const searchForAdvertisesSuccess = createAction(
  '[Advertise/API/Home] Search For Advertise Success',
  props<{ result: IGroupedAdvertise[] }>()
);
