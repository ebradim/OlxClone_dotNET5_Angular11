import { createAction, props } from '@ngrx/store';
import { IRegister } from '../models/Register';

export const register = createAction(
  '[Register] Start Register',
  props<{ user: IRegister }>()
);
