import { createAction, props } from '@ngrx/store';
import { ILogin } from '../models/Login';

export const login = createAction(
  '[Login] Start Login',
  props<{ user: ILogin }>()
);
