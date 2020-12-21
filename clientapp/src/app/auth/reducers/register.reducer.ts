import { createReducer, on } from '@ngrx/store';
import { fromAPIActions } from 'src/app/actions';
import { fromRegisterActions } from '../actions';
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
  on(fromRegisterActions.register, (state) => {
    return {
      ...state,
      connecting: true,
      error: null,
    };
  }),
  on(fromAPIActions.registerError, (state, { error }) => {
    return {
      ...state,
      connecting: false,
      error,
    };
  }),
  on(fromAPIActions.registerSuccess, (state) => {
    return {
      ...state,
      connecting: false,
      error: null,
    };
  })
);
export const isConnecting = (state: State) => state.connecting;
export const getError = (state: State) => state.error;
