import { createReducer, on } from '@ngrx/store';
import { fromAPIActions, fromHomeActions } from 'src/app/root/actions';

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
  on(fromHomeActions.loadHomeAdvertises, (state) => {
    return {
      ...state,
      connecting: true,
      error: null,
    };
  }),
  on(fromAPIActions.loadHomeAdvertisesError, (state, { error }) => {
    return {
      ...state,
      connecting: false,
      error,
    };
  }),
  on(fromAPIActions.loadHomeAdvertisesSuccess, (state) => {
    return {
      ...state,
      connecting: false,
      error: null,
    };
  })
);
export const isConnecting = (state: State) => state.connecting;
export const getError = (state: State) => state.error;
