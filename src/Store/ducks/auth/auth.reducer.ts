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
  keepMeConnected: false,
  loading: false,
};

const auth = (state = INITIAL_STATE, action: AuthActionTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/REQUEST_LOGIN': {
        draft.loading = true;
        break;
      }

      case '@auth/REQUEST_LOGIN_FAILURE': {
        draft.loading = false;
        break;
      }

      case AUTH_REQUEST_LOGIN_SUCCESS: {
        const { checked, token } = action.payload;

        draft.token = token;
        draft.logged = true;
        draft.keepMeConnected = checked;
        draft.loading = false;
        break;
      }

      case AUTH_LOGOUT: {
        draft.logged = false;
        draft.token = null;
        draft.keepMeConnected = false;
        draft.loading = false;
        break;
      }

      default:
        break;
    }
  });
};

export default auth;
