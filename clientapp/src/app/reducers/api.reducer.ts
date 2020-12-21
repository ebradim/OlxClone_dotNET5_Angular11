import { createReducer, on } from '@ngrx/store';
import { fromAPIActions } from '../actions';
import { IUser } from '../auth/models/API';

export interface State {
  user: IUser | null;
}
export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(
    fromAPIActions.loginSuccess,
    fromAPIActions.registerSuccess,
    (state, { user }) => {
      return {
        ...state,
        user,
      };
    }
  ),

  on(
    fromAPIActions.loginError,
    fromAPIActions.registerError,
    fromAPIActions.logoutSuccess,
    () => initialState
  )
);
export const getUser = (state: State) => state?.user;
