import * as fromRouter from '@ngrx/router-store';
import * as fromAPI from './api.reducer';
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
  api: fromAPI.State;
}

export const featureSelector = createFeatureSelector<RootState>('root');

export const routerState = createSelector(featureSelector, (x) => x.router);
export const apiState = createSelector(featureSelector, (x) => x.api);
export const getCurrentUser = createSelector(apiState, fromAPI.getUser);
export const isAuthenticated = createSelector(apiState, (x) => !!x.user);
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
  api: fromAPI.reducer,
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
