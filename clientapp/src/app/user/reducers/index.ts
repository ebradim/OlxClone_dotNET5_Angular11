import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromFavoriteAdvertises from './advertise-favorite.reducer';
import * as fromUserAPI from './user-api.reducer';

export interface UserState {
  favorites: fromFavoriteAdvertises.State;
  api: fromUserAPI.State;
}

export function reducers(state: UserState, action: Action): any {
  return combineReducers({
    favorites: fromFavoriteAdvertises.reducer,
    api: fromUserAPI.reducer,
  })(state, action);
}
export const featureSelector = createFeatureSelector<UserState>('user');
export const favoritesState = createSelector(
  featureSelector,
  (x) => x.favorites
);
export const apiState = createSelector(featureSelector, (x) => x.api);

export const isFavAdsLoading = createSelector(
  apiState,
  fromUserAPI.isConnecting
);
export const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal,
} = fromFavoriteAdvertises.adapter.getSelectors(favoritesState);

export const getTotalCache = createSelector(selectAll, (entites) =>
  entites.reduce((x, y) => x + y.price, 0)
);

export const getErrorLogin = createSelector(apiState, fromUserAPI.getError);

export const getFavoriteAdvertises = selectAll;
