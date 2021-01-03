import { createAction, props } from '@ngrx/store';
import { IAddAdvertise } from '../models/Advertise';

export const addAdvertise = createAction(
  '[Advertise/API] Add Advertise',
  props<{ advertise: IAddAdvertise }>()
);
