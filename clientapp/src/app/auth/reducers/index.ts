import * as fromLogin from './login.reducer';
import * as fromRegister from './register.reducer';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export interface AuthState {
  login: fromLogin.State;
  register: fromRegister.State;
}

export function reducers(state: AuthState, action: Action): any {
  return combineReducers({
    login: fromLogin.reducer,
    register: fromRegister.reducer,
  })(state, action);
}
export const featureSelector = createFeatureSelector<AuthState>('auth');
export const loginState = createSelector(featureSelector, (x) => x.login);

export const registerState = createSelector(featureSelector, (x) => x.register);

export const isLogging = createSelector(loginState, fromLogin.isConnecting);
export const getErrorLogin = createSelector(loginState, fromLogin.getError);

export const isRegistering = createSelector(
  registerState,
  fromLogin.isConnecting
);
export const getErrorRegister = createSelector(
  registerState,
  fromLogin.getError
);
