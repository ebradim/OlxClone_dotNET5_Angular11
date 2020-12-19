import { createReducer, on } from '@ngrx/store';
import { fromAPIActions } from '../actions';
import { IUser } from '../models/API';

export interface State {
  user: IUser | null;
}
export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(fromAPIActions.loginSuccess, (state, { user }) => {
    return {
      ...state,
      user,
    };
  }),
  on(fromAPIActions.loginError, () => initialState)
);
export const getUser = (state: State) => state.user;
