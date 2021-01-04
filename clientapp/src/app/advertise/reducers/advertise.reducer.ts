import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IResponseAdvertise } from '../models/Advertise';
import { fromAPIActions } from 'src/app/root/actions';
import { fromAdvertise } from '../actions';
import { advertiseState, RootState } from 'src/app/root/reducers';
export interface State extends EntityState<IResponseAdvertise> {
  // additional entities state properties
  selectedAdvertiseId: number | null;
}

export const adapter: EntityAdapter<IResponseAdvertise> = createEntityAdapter<IResponseAdvertise>(
  {
    selectId: (ad) => ad.userAdvertise.advertise.id,
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
    return adapter.setAll(advertises, state);
  }),
  on(fromAPIActions.addAdvertiseSuccess, (state, { advertise }) => {
    return adapter.addOne(advertise, state);
  }),
  on(fromAdvertise.selectAdvertise, (state, { id }) => {
    return {
      ...state,
      selectedAdvertiseId: id,
    };
  })

  // on error leave them in state
);

// get the selectors
const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal,
} = adapter.getSelectors();
export const getHomeAds = selectAll;
