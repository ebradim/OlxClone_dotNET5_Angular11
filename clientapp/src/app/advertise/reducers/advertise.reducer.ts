import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IResponseAdvertise } from '../models/Advertise';
import { fromAPIActions } from 'src/app/root/actions';
import { fromAdvertise } from '../actions';
import { advertiseState, RootState } from 'src/app/root/reducers';
export interface State extends EntityState<IResponseAdvertise> {
  // additional entities state properties
  selectedAdvertiseId: string | null;
}

export const adapter: EntityAdapter<IResponseAdvertise> = createEntityAdapter<IResponseAdvertise>(
  {
    selectId: (ad) => ad.userAdvertise.advertise.uniqueId,
    sortComparer: false,
  }
);

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedAdvertiseId: null,
});

export const reducer = createReducer(
  initialState,
  on(fromAPIActions.loadHomeAdvertisesSuccess, (state, { advertises }) => {
    return adapter.upsertMany(advertises, state);
  }),
  on(fromAPIActions.addAdvertiseSuccess, (state, { advertise }) => {
    return adapter.upsertOne(advertise, state);
  }),

  on(fromAdvertise.selectAdvertise, (state, { uniqueId }) => {
    return {
      ...state,
      selectedAdvertiseId: uniqueId,
    };
  }),
  on(fromAPIActions.loadAdvertiseFromAPISuccess, (state, { advertise }) => {
    return adapter.upsertOne(advertise, state);
  })

  // on error leave them in state
);

// get the selectors
export const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal,
} = adapter.getSelectors();
export const getHomeAds = selectAll;
