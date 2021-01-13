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
export const addToFavorite = createAction(
  '[Advertise/API] Add Advertise to favorite',
  props<{ uniqueId: string }>()
);
export const removeFromFavorite = createAction(
  '[Advertise/API] Remove Advertise from favorite',
  props<{ uniqueId: string }>()
);
export const likeAdvertise = createAction(
  '[Advertise/API] Like Advertise',
  props<{ uniqueId: string }>()
);
