import { createAction, props } from '@ngrx/store';
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