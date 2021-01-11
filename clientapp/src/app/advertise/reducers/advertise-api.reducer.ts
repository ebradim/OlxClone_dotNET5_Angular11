import { createReducer, on } from '@ngrx/store';
import { fromAdvertise, fromAdvertiseAPI } from '../actions';

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
    fromAdvertise.addAdvertise,
    fromAdvertise.addToFavorite,
    fromAdvertise.deleteAdvertise,
    fromAdvertise.removeFromFavorite,
    fromAdvertise.editAdvertise,
    (state) => {
      return {
        ...state,
        connecting: true,
        error: null,
      };
    }
  ),
  on(
    fromAdvertiseAPI.addAdvertiseSuccess,
    fromAdvertiseAPI.addAdvertiseToFavSuccess,
    fromAdvertiseAPI.deleteAdvertiseSuccess,
    fromAdvertiseAPI.removeAdvertiseFromFavSuccess,
    fromAdvertiseAPI.editAdvertiseSuccess,
    (state) => {
      return {
        ...state,
        connecting: false,
        error: null,
      };
    }
  ),
  on(
    fromAdvertiseAPI.addAdvertiseError,
    fromAdvertiseAPI.addAdvertiseToFavError,
    fromAdvertiseAPI.deleteAdvertiseError,
    fromAdvertiseAPI.removeAdvertiseFromFavError,
    fromAdvertiseAPI.editAdvertiseError,
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
