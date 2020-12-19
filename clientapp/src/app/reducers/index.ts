import * as fromRouter from '@ngrx/router-store';
import {
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
  ActionReducerMap,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>('router');

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouter);
export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
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
