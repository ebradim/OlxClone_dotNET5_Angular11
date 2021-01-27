import { createAction, props } from '@ngrx/store';

export const loadAdvertises = createAction('[Explore/Filer] Load Advertise');
export const filterByLastId = createAction(
  '[Explore/Filer] Filter LastId',
  props<{ advertiseId: string }>()
);

export const filterByCategory = createAction(
  '[Explore/Filer] Filter Category',
  props<{ category: string }>()
);

export const filterByCategoryLastId = createAction(
  '[Explore/Filer] Filter Category LastId',
  props<{ category: string; lastId: string }>()
);

export const pageChange = createAction(
  '[Explore/Filer] Page Entity Change',
  props<{ page: number }>()
);
