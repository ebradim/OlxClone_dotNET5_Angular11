import { createReducer, on } from '@ngrx/store';
import { fromFavoriteAdvertisesActions, fromUserAPIActions } from '../actions';

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
  on(fromFavoriteAdvertisesActions.getFavoriteAdvertises, (state) => {
    return {
      ...state,
      connecting: true,
      error: null,
    };
  }),
  on(fromUserAPIActions.getFavoriteAdvertisesSuccess, (state) => {
    return {
      ...state,
      connecting: false,
      error: null,
    };
  }),
  on(fromUserAPIActions.getFavoriteAdvertisesError, (state, { error }) => {
    return {
      ...state,
      connecting: false,
      error,
    };
  })
);
export const isConnecting = (state: State) => state.connecting;
export const getError = (state: State) => state.error;
