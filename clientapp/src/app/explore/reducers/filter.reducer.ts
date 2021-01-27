import { createReducer, on } from '@ngrx/store';
import { IFilterAdvertise } from '../models/advertise';
import { fromFilter, fromFilterAPI } from '../actions';
export interface State {
  lastAdvertiseId: string | null;
  entities: IFilterAdvertise[];
  currentPage: number;
}

export const initialState: State = {
  lastAdvertiseId: null,
  entities: [],
  currentPage: 1,
};
export const reducer = createReducer(
  initialState,
  on(fromFilterAPI.loadAdvertisesSuccess, (state, { advertise }) => {
    return {
      ...state,
      lastAdvertiseId: advertise.lastId,
      entities: advertise.advertises,
    };
  }),
  on(fromFilterAPI.filterByCategorySuccess, (state, { advertise }) => {
    return {
      ...state,
      lastAdvertiseId: advertise.lastId,
      entities: advertise.advertises,
    };
  }),
  on(fromFilterAPI.filterByCategoryLastIdSuccess, (state, { advertise }) => {
    return {
      ...state,
      lastAdvertiseId: advertise.lastId,
      entities: state.entities.concat(advertise.advertises),
    };
  }),
  on(fromFilterAPI.filterByLastIdSuccess, (state, { advertise }) => {
    return {
      ...state,
      lastAdvertiseId: advertise.lastId,
      entities: state.entities.concat(advertise.advertises),
    };
  }),
  on(fromFilter.pageChange, (state, { page }) => {
    return {
      ...state,
      currentPage: page,
    };
  })
);

// get the selectors
export const getLastAdvertiseId = (state: State) => state.lastAdvertiseId;
export const getEntites = (state: State) => state.entities;
export const getEntitesCount = (state: State) => state.entities.length;
export const getCurrentPage = (state: State) => state.currentPage;
