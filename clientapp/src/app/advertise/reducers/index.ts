import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAdvertise from './advertise.reducer';
import * as fromAPI from './advertise-api.reducer';

export interface AdvertiseState {
  advertise: fromAdvertise.State;
  api: fromAPI.State;
}

export function reducers(state: AdvertiseState, action: Action): any {
  return combineReducers({
    advertise: fromAdvertise.reducer,
    api: fromAPI.reducer,
  })(state, action);
}

export const featureSelector = createFeatureSelector<AdvertiseState>(
  'advertise'
);

export const advertiseState = createSelector(
  featureSelector,
  (x) => x.advertise
);
export const apiState = createSelector(featureSelector, (x) => x.api);

export const getConnecting = createSelector(apiState, fromAPI.isConnecting);
export const getError = createSelector(apiState, fromAPI.getError);

export const getSelectedId = createSelector(
  advertiseState,
  fromAdvertise.getSelectedId
);
export const getSelectedIdEntity = createSelector(
  advertiseState,
  fromAdvertise.getSelectedId
);
const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal,
} = fromAdvertise.adapter.getSelectors(advertiseState);
export const getAdvertisesEntities = selectEntities;

export const getSelectedAdvertiseIdEntity = createSelector(
  selectEntities,
  getSelectedId,
  (entities, id) => id && entities[id]
);
