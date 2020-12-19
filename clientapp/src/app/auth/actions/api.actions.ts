import { createAction, props } from '@ngrx/store';
import { IUser } from '../models/API';

export const loginSuccess = createAction(
  '[API] Login Success',
  props<{ user: IUser }>()
);
export const loginError = createAction(
  '[API] Login Error',
  props<{ error: any }>()
);
