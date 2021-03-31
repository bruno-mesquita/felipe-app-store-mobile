import produce from 'immer';

import {
  AuthState,
  AUTH_LOGOUT,
  AUTH_REQUEST_LOGIN_SUCCESS,
  AuthActionTypes,
} from './auth.types';

const INITIAL_STATE: AuthState = {
  token: null,
  logged: false,
};

const auth = (state = INITIAL_STATE, action: AuthActionTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      case AUTH_REQUEST_LOGIN_SUCCESS: {
        draft.token = action.payload.token;
        draft.logged = true;
        break;
      }

      case AUTH_LOGOUT: {
        draft.logged = false;
        draft.token = null;
        break;
      }

      default:
        break;
    }
  });
};

export default auth;
