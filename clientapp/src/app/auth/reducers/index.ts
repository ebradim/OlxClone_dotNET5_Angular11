import * as fromLogin from './login.reducer';
import * as fromApi from './api.reducer';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface AuthState {
  login: fromLogin.State;
  api: fromApi.State;
}

export function reducers(state: AuthState, action: Action): any {
  return combineReducers({
    login: fromLogin.reducer,
    api: fromApi.reducer,
  })(state, action);
}
export const featureSelector = createFeatureSelector<AuthState>('auth');
export const loginState = createSelector(featureSelector, (x) => x.login);
export const apiState = createSelector(featureSelector, (x) => x.api);

export const getCurrentUser = createSelector(apiState, fromApi.getUser);
export const isConnecting = createSelector(loginState, fromLogin.isConnecting);
export const getError = createSelector(loginState, fromLogin.getError);
