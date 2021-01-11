import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { fromAPIActions } from 'src/app/root/actions';
import { IResponseHomeAdvertise } from '../../../advertise/models/Advertise';

export interface State extends EntityState<IResponseHomeAdvertise> {
  // additional entities state properties
  selectedAdvertiseId: string | null;
}

export const adapter: EntityAdapter<IResponseHomeAdvertise> = createEntityAdapter<IResponseHomeAdvertise>(
  {
    selectId: (ad) => ad.userAdvertise.uniqueId,
    sortComparer: false,
  }
);

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedAdvertiseId: null,
});
export const reducer = createReducer(
  initialState,
  // tslint:disable-next-line: no-shadowed-variable
  on(fromAPIActions.loadHomeAdvertisesSuccess, (state, { advertises }) => {
    return adapter.upsertMany(advertises, state);
  })
);
export const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal,
} = adapter.getSelectors();
export const getHomeAds = selectAll;
