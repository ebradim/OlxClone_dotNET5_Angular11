import * as fromFilter from './filter.reducer';
import * as fromAPI from './filter-api.reducer';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
export interface FilterState {
  filter: fromFilter.State;
  api: fromAPI.State;
}

export function reducers(state: FilterState, action: Action): any {
  return combineReducers({
    filter: fromFilter.reducer,
    api: fromAPI.reducer,
  })(state, action);
}

export const featureSelector = createFeatureSelector<FilterState>('filter');

export const filterState = createSelector(featureSelector, (x) => x.filter);
export const apiState = createSelector(featureSelector, (x) => x.api);

export const getConnecting = createSelector(apiState, fromAPI.isConnecting);
export const getError = createSelector(apiState, fromAPI.getError);

export const getLastAdvertiseID = createSelector(
  filterState,
  fromFilter.getLastAdvertiseId
);
export const getCurrentPage = createSelector(
  filterState,
  fromFilter.getCurrentPage
);

const getFilteredEntities = createSelector(filterState, fromFilter.getEntites);
export const getFilteredEntity = createSelector(
  getFilteredEntities,
  getCurrentPage,
  (entities, page) => {
    const start = (page - 1) * 10 + 1;
    const end = page * 10;

    return entities.slice(start - 1, end);
  }
);
export const getFilteredEntityCount = createSelector(
  filterState,
  fromFilter.getEntitesCount
);
