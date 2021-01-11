import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { fromAPIActions } from 'src/app/root/actions';
import { IResponseHomeAdvertise } from '../../../advertise/models/Advertise';
import { IGroupedAdvertise } from '../models/SearchAdvertise';

export interface State extends EntityState<IGroupedAdvertise> {
  selectedAdvertiseId: string | null;
}

export const adapter: EntityAdapter<IGroupedAdvertise> = createEntityAdapter<IGroupedAdvertise>(
  {
    selectId: (ad) => ad.category,
    sortComparer: false,
  }
);

export const initialState: State = adapter.getInitialState({
  selectedAdvertiseId: null,
});
export const reducer = createReducer(
  initialState,
  on(fromAPIActions.searchForAdvertisesSuccess, (state, { result }) => {
    return adapter.setAll(result, state);
  })
);
const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal,
} = adapter.getSelectors();
export const getSearchResult = selectAll;
