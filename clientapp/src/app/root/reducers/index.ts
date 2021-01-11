import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './user-api.reducer';
import * as fromAdvertiseHome from '../home/reducers/advertises-home.reducer';
import * as fromHomeAPI from '../home/reducers/advertises-home-api.reducer';
import * as fromSearch from '../home/reducers/advertise-search.reducer';
import {
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
  ActionReducerMap,
  createSelector,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
export interface RootState {
  router: fromRouter.RouterReducerState<any>;
  auth: fromAuth.State;
  homeAdvertisesAPI: fromHomeAPI.State;
  homeAdvertises: fromAdvertiseHome.State;
  search: fromSearch.State;
}

export const featureSelector = createFeatureSelector<RootState>('root');

export const routerState = createSelector(featureSelector, (x) => x.router);
export const userState = createSelector(featureSelector, (x) => x.auth);

export const advertiseHomeState = createSelector(
  featureSelector,
  (x) => x.homeAdvertises
);
export const homeState = createSelector(
  featureSelector,
  (x) => x.homeAdvertisesAPI
);
export const searchState = createSelector(featureSelector, (x) => x.search);
export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(routerState);
export const getCurrentUser = createSelector(userState, fromAuth.getUser);
export const isAuthenticated = createSelector(userState, (x) => !!x.user);

export const isHomeAdsLoading = createSelector(
  homeState,
  fromHomeAPI.isConnecting
);

export const getAdvertiseSearchResult = createSelector(
  searchState,
  fromSearch.getSearchResult
);

export const isHomeAdsError = createSelector(homeState, fromHomeAPI.getError);

export const selectHomeAdvertises = createSelector(
  advertiseHomeState,
  fromAdvertiseHome.getHomeAds
);

export const reducers: ActionReducerMap<RootState> = {
  router: fromRouter.routerReducer,
  auth: fromAuth.reducer,
  homeAdvertisesAPI: fromHomeAPI.reducer,
  homeAdvertises: fromAdvertiseHome.reducer,
  search: fromSearch.reducer,
};
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const x = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('state', state);
    console.log('action', action);
    console.log('current', x);
    console.groupEnd();
    return x;
  };
}
export const metaReducers: MetaReducer<any>[] = environment.production
  ? []
  : [debug];
