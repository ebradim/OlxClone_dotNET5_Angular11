import { createReducer, on } from '@ngrx/store';
import { fromAPIActions } from 'src/app/actions';
import { fromLoginActions } from '../actions';

export interface State {
  connecting: boolean;
  error: any;
}
export const initialState: State = {
  connecting: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(fromLoginActions.login, (state) => {
    return {
      ...state,
      connecting: true,
      error: null,
    };
  }),
  on(fromAPIActions.loginError, (state, { error }) => {
    return {
      ...state,
      connecting: false,
      error,
    };
  }),
  on(fromAPIActions.loginSuccess, (state) => {
    return {
      ...state,
      connecting: false,
      error: null,
    };
  })
);
export const isConnecting = (state: State) => state.connecting;
export const getError = (state: State) => state.error;
