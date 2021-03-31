import produce from 'immer';

import {
  UserState,
  UserActionTypes,
  UPDATE_PROFILE_REQUEST_SUCCESS,
  UPDATE_AVATAR_REQUEST_FAILURE,
  UPDATE_AVATAR_REQUEST_SUCCESS,
  UPDATE_PROFILE_REQUEST_FAILURE,
  SET_ADDRESS_ACTIVE,
} from './user.types';
import { AUTH_REQUEST_LOGIN_SUCCESS, AUTH_LOGOUT } from '../auth/auth.types';

const INITIAL_STATE: UserState = {
  id: null,
  profile: {
    name: null,
    avatar: null,
    cpf: null,
    phone: null,
    email: null,
    adresses: [],
  },
  addressActive: null,
  error: null,
};

const user = (state = INITIAL_STATE, action: UserActionTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      case AUTH_REQUEST_LOGIN_SUCCESS: {
        const { user } = action.payload;

        draft.id = user.id;
        draft.profile = {
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          avatar: user.avatar,
          phone: user.phone,
          adresses: user.adresses,
        };
        break;
      }

      case AUTH_LOGOUT: {
        draft.id = null;
        draft.profile = {
          name: null,
          email: null,
          phone: null,
          cpf: null,
          avatar: null,
          adresses: [],
        };
        draft.addressActive = null;
        break;
      }

      case UPDATE_PROFILE_REQUEST_SUCCESS: {
        const { name, cellphone, email } = action.payload.profile;

        draft.profile.name = name;
        draft.profile.email = email;
        draft.profile.phone = cellphone;
        draft.error = null;
        break;
      }

      case UPDATE_AVATAR_REQUEST_SUCCESS: {
        const { encoded } = action.payload;

        draft.profile.avatar = encoded;
        draft.error = null;
        break;
      }

      case UPDATE_AVATAR_REQUEST_FAILURE: {
        const { message } = action.payload;

        draft.error = message;
        break;
      }

      case UPDATE_PROFILE_REQUEST_FAILURE: {
        const { message } = action.payload;

        draft.error = message;
        break;
      }

      case SET_ADDRESS_ACTIVE: {
        const { addressClientId } = action.payload;

        draft.addressActive = addressClientId;
        break;
      }

      default:
        break;
    }
  });
};

export default user;
