import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { fromAPIActions } from 'src/app/root/actions';
import { IReceivedOffer } from '../models/OffersHubs';
import { IGroupedAdvertise } from '../models/SearchAdvertise';

export interface State extends EntityState<IReceivedOffer> {
  selectedAdvertiseId: string | null;
}
export const adapter: EntityAdapter<IReceivedOffer> = createEntityAdapter<IReceivedOffer>(
  {
    selectId: (ad) => ad.message.substring(0, 5) + new Date().getSeconds(),
    sortComparer: false,
  }
);
export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedAdvertiseId: null,
});
export const reducer = createReducer(
  initialState,
  on(fromAPIActions.onReceivedOfferSuccess, (state, { data }) => {
    return adapter.addOne(data, state);
  })
);
const {
  selectIds,
  selectAll,
  selectEntities,
  selectTotal,
} = adapter.getSelectors();
export const getOfferEntities = selectAll;
export const getOfferEntitiesCount = selectTotal;
