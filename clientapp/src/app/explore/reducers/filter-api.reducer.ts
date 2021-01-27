import { createReducer, on } from '@ngrx/store';
import { fromFilterAPI, fromFilter } from '../actions';

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
  on(
    fromFilter.loadAdvertises,
    fromFilter.filterByCategory,
    fromFilter.filterByCategoryLastId,
    fromFilter.filterByLastId,
    (state) => {
      return {
        ...state,
        connecting: true,
        error: null,
      };
    }
  ),
  on(
    fromFilterAPI.loadAdvertisesSuccess,
    fromFilterAPI.filterByCategoryLastIdSuccess,
    fromFilterAPI.filterByCategorySuccess,
    fromFilterAPI.filterByLastIdSuccess,
    (state) => {
      return {
        ...state,
        connecting: false,
        error: null,
      };
    }
  ),
  on(
    fromFilterAPI.loadAdvertisesError,
    fromFilterAPI.filterByCategoryError,
    fromFilterAPI.filterByLastIdError,
    fromFilterAPI.filterByCategoryLastIdError,
    (state, { error }) => {
      return {
        ...state,
        connecting: false,
        error,
      };
    }
  )
);
export const isConnecting = (state: State) => state.connecting;
export const getError = (state: State) => state.error;
