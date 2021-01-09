import { createAction, props } from '@ngrx/store';

export const getFavoriteAdvertises = createAction(
  '[User/Advertise/Favorite] Get Fav Ads'
);
export const removeAdvertisesFromFavorite = createAction(
  '[User/Advertise/Favorite] Remove Fav Ad',
  props<{ uniqueId: string }>()
);
