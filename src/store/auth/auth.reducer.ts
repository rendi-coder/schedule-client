import { Reducer } from 'redux';

import { LOGIN, LOGOUT } from './auth.const';
import { AuthAction, AuthState } from './auth.types';

const initialState = {
  token: null,
  user: null,
};

export const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};
