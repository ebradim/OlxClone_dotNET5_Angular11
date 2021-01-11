import { createAction, props } from '@ngrx/store';

export const loadHomeAdvertises = createAction(
  '[Advertise/API/Home] Load Advertise'
);
export const searchForAdvertises = createAction(
  '[Advertise/API/Home] Search For Advertises',
  props<{ term: string }>()
);
