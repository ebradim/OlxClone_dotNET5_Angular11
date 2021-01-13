import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IResponseAdvertise, IRoot } from '../models/Advertise';
import { fromAdvertise, fromAdvertiseAPI } from '../actions';
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
  // tslint:disable-next-line: no-shadowed-variable
  on(fromAdvertiseAPI.addAdvertiseSuccess, (state, { advertise }) => {
    return adapter.upsertOne(advertise, state);
  }),
  // tslint:disable-next-line: no-shadowed-variable
  on(fromAdvertise.selectAdvertise, (state, { uniqueId }) => {
    return {
      ...state,
      selectedAdvertiseId: uniqueId,
    };
  }),
  // tslint:disable-next-line: no-shadowed-variable
  on(fromAdvertiseAPI.loadAdvertiseFromAPISuccess, (state, { advertise }) => {
    return adapter.upsertOne(advertise, state);
  }),
  // tslint:disable-next-line: no-shadowed-variable
  on(fromAdvertiseAPI.deleteAdvertiseSuccess, (state) => {
    return adapter.removeOne(state.selectedAdvertiseId as string, state);
  }),
  // tslint:disable-next-line: no-shadowed-variable
  on(fromAdvertiseAPI.editAdvertiseSuccess, (state, { advertise }) => {
    return adapter.updateOne(
      {
        id: state.selectedAdvertiseId as string,
        changes: advertise,
      },
      state
    );
  }),
  on(fromAdvertiseAPI.addAdvertiseToFavSuccess, (state) => {
    return adapter.updateOne(
      {
        id: state.selectedAdvertiseId as string,
        changes: {
          ...(state.entities[
            state.selectedAdvertiseId as string
          ] as IResponseAdvertise),
          userAdvertise: {
            ...(state.entities[state.selectedAdvertiseId as string]
              ?.userAdvertise as IRoot),
            isFavorite: true,
          },
        },
      },
      state
    );
  }),
  on(fromAdvertiseAPI.removeAdvertiseFromFavSuccess, (state) => {
    return adapter.updateOne(
      {
        id: state.selectedAdvertiseId as string,
        changes: {
          ...(state.entities[
            state.selectedAdvertiseId as string
          ] as IResponseAdvertise),
          userAdvertise: {
            ...(state.entities[state.selectedAdvertiseId as string]
              ?.userAdvertise as IRoot),
            isFavorite: false,
          },
        },
      },
      state
    );
  }),
  on(fromAdvertiseAPI.likeAdvertiseSuccess, (state) => {
    return adapter.updateOne(
      {
        id: state.selectedAdvertiseId as string,
        changes: {
          ...(state.entities[
            state.selectedAdvertiseId as string
          ] as IResponseAdvertise),
          userAdvertise: {
            ...(state.entities[state.selectedAdvertiseId as string]
              ?.userAdvertise as IRoot),
            isLiked: true,
            likes:
              (state.entities[state.selectedAdvertiseId as string]
                ?.userAdvertise as IRoot).likes + 1,
          },
        },
      },
      state
    );
  })

  // on error leave them in state
);

// get the selectors
export const getSelectedId = (state: State) => state.selectedAdvertiseId;
