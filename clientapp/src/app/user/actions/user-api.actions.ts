import { createAction, props } from '@ngrx/store';
import { IFavoriteAdvertise } from '../models/FavoriteAdvertise';

export const getFavoriteAdvertisesSuccess = createAction(
  '[User/Advertise/Favorite] Get Fav Ads Succes',
  props<{ favorites: IFavoriteAdvertise[] }>()
);
export const getFavoriteAdvertisesError = createAction(
  '[User/Advertise/Favorite] Get Fav Ads Error',
  props<{ error: any }>()
);
export const removeAdvertisesFromFavoriteSuccess = createAction(
  '[User/Advertise/Favorite] Remove Fav Ad Success',
  props<{ result: boolean }>()
);
export const removeAdvertisesFromFavoriteError = createAction(
  '[User/Advertise/Favorite] Remove Fav Ad Error',
  props<{ error: any }>()
);
