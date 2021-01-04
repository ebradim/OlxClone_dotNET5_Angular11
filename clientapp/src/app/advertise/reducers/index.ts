import { createSelector } from '@ngrx/store';
import { advertiseState } from 'src/app/root/reducers';
import { fromAdvertise } from '../actions';
export const getSelectedAdvertiseIdEntity = createSelector(
  advertiseState,
  (state) => {
    return (
      state.selectedAdvertiseId && state.entities[state.selectedAdvertiseId]
    );
  }
);
