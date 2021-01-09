import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { fromAdvertise } from 'src/app/advertise/actions';
import { fromFavoriteAdvertisesActions, fromUserAPIActions } from '../actions';
import { IFavoriteAdvertise } from '../models/FavoriteAdvertise';

export interface State extends EntityState<IFavoriteAdvertise> {
  // additional entities state properties
  selectedAdvertiseId: string | null;
}

export const adapter: EntityAdapter<IFavoriteAdvertise> = createEntityAdapter<IFavoriteAdvertise>(
  {
    selectId: (ad) => ad.uniqueId,
    sortComparer: false,
  }
);

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedAdvertiseId: null,
});

export const reducer = createReducer(
  initialState,
  on(
    fromFavoriteAdvertisesActions.removeAdvertisesFromFavorite,
    (state, { uniqueId }) => {
      return {
        ...state,
        selectedAdvertiseId: uniqueId,
      };
    }
  ),
  // tslint:disable-next-line: no-shadowed-variable
  on(
    fromUserAPIActions.getFavoriteAdvertisesSuccess,
    (state, { favorites }) => {
      return adapter.upsertMany(favorites, state);
    }
  ),
  on(fromUserAPIActions.removeAdvertisesFromFavoriteSuccess, (state) => {
    return adapter.removeOne(state.selectedAdvertiseId as string, state);
  })
);
