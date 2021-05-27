import produce from 'immer';

import {
  AuthState,
  AuthActionTypes,
} from './auth.types';

const INITIAL_STATE: AuthState = {
  token: null,
  refreshToken: null,
  logged: false,
  keepMeConnected: false,
  loading: false,
  establishmentExists: false,
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

      case '@auth/REQUEST_ESTABLISHENT_EXISTS_SUCCESS': {
        draft.establishmentExists = action.payload.exists;
        break;
      }

      case '@auth/REQUEST_LOGIN_SUCCESS': {
        const { checked, token, refreshToken } = action.payload;

        draft.token = token;
        draft.refreshToken = refreshToken;
        draft.logged = true;
        draft.keepMeConnected = checked;
        draft.loading = false;
        break;
      }

      case '@auth/LOGOUT': {
        draft.logged = false;
        draft.token = null;
        draft.refreshToken = null;
        draft.keepMeConnected = false;
        draft.loading = false;
        break;
      }

      case '@auth/REFRESH_TOKEN_SUCCESS': {
        const { accessToken, refreshToken } = action.payload;

        draft.token = accessToken;
        draft.refreshToken = refreshToken;

        break;
      }

      default:
        break;
    }
  });
};

export default auth;
