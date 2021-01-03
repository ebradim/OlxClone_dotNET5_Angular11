import { createReducer, on } from '@ngrx/store';
import { fromAPIActions } from '../../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IResponseAdvertise } from '../models/Advertise';
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
  })

  // on error leave them in state
);
export const getSelectedUserId = (state: State) => state.selectedAdvertiseId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
export const getHomeAds = selectAll;
