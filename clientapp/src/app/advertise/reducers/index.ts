import { createSelector } from '@ngrx/store';
import { advertiseState, selectRouteParam } from 'src/app/root/reducers';
import { fromAdvertise } from '../actions';
export const getSelectedAdvertiseIdEntity = createSelector(
  advertiseState,
  (state) => {
    return (
      state.selectedAdvertiseId && state.entities[state.selectedAdvertiseId]
    );
  }
);
export const loadAdvertiseFromEntityWithParam = createSelector(
  advertiseState,
  selectRouteParam('id'),
  (state, id) => {
    console.log(state.entities[id!]);
    return id && state.entities[id];
  }
);
