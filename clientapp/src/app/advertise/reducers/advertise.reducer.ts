import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IResponseAdvertise, IRoot } from '../models/Advertise';
import { fromAPIActions } from 'src/app/root/actions';
import { fromAdvertise } from '../actions';
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
  on(fromAPIActions.addAdvertiseSuccess, (state, { advertise }) => {
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
  on(fromAPIActions.loadAdvertiseFromAPISuccess, (state, { advertise }) => {
    return adapter.upsertOne(advertise, state);
  }),
  // tslint:disable-next-line: no-shadowed-variable
  on(fromAPIActions.deleteAdvertiseSuccess, (state) => {
    return adapter.removeOne(state.selectedAdvertiseId as string, state);
  }),
  // tslint:disable-next-line: no-shadowed-variable
  on(fromAPIActions.editAdvertiseSuccess, (state, { advertise }) => {
    return adapter.updateOne(
      {
        id: state.selectedAdvertiseId as string,
        changes: advertise,
      },
      state
    );
  }),
  on(fromAPIActions.addAdvertiseToFavSuccess, (state) => {
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
  on(fromAPIActions.removeAdvertiseFromFavSuccess, (state) => {
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
  })

  // on error leave them in state
);

// get the selectors
