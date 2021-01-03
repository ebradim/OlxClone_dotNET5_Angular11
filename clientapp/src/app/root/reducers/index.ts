import * as fromRouter from '@ngrx/router-store';
import * as fromUser from './user-api.reducer';
import * as fromAdvertise from '../advertise/reducers/advertise.reducer';
import * as fromHomeAPI from '../home/reducers/home-api.reducer';
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
  user: fromUser.State;
  advertise: fromAdvertise.State;
  home: fromHomeAPI.State;
}

export const featureSelector = createFeatureSelector<RootState>('root');

export const routerState = createSelector(featureSelector, (x) => x.router);
export const userState = createSelector(featureSelector, (x) => x.user);
export const homeAdvertiseState = createSelector(
  featureSelector,
  (x) => x.advertise
);
export const homeState = createSelector(featureSelector, (x) => x.home);

export const getCurrentUser = createSelector(userState, fromUser.getUser);
export const isAuthenticated = createSelector(userState, (x) => !!x.user);

export const isHomeAdsLoading = createSelector(
  homeState,
  fromHomeAPI.isConnecting
);
export const isHomeAdsError = createSelector(homeState, fromHomeAPI.getError);

export const selectHomeAdvertises = createSelector(
  homeAdvertiseState,
  fromAdvertise.getHomeAds
);

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

export const reducers: ActionReducerMap<RootState> = {
  router: fromRouter.routerReducer,
  user: fromUser.reducer,
  advertise: fromAdvertise.reducer,
  home: fromHomeAPI.reducer,
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
