import { createAction, props } from '@ngrx/store';
import { IAddAdvertise, IEditAdvertise } from '../models/Advertise';

export const addAdvertise = createAction(
  '[Advertise/API] Add Advertise',
  props<{ advertise: IAddAdvertise }>()
);
export const selectAdvertise = createAction(
  '[Advertise/API] Select Advertise',
  props<{ uniqueId: string }>()
);
export const deleteAdvertise = createAction(
  '[Advertise/API] Delete Advertise',
  props<{ uniqueId: string }>()
);
export const editAdvertise = createAction(
  '[Advertise/API] Edit Advertise',
  props<{ uniqueId: string; advertise: IEditAdvertise }>()
);
