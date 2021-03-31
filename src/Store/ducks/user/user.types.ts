import { AUTH_LOGOUT, RequestLoginSuccessAction } from '../auth/auth.types';

export const UPDATE_PROFILE_REQUEST = '@user/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_REQUEST_SUCCESS =
  '@user/UPDATE_PROFILE_REQUEST_SUCCESS';
export const UPDATE_PROFILE_REQUEST_FAILURE =
  '@user/UPDATE_PROFILE_REQUEST_FAILURE';

export const CHANGE_USER_PASSWORD_REQUEST =
  '@user/CHANGE_USER_PASSWORD_REQUEST';
export const CHANGE_USER_PASSWORD_REQUEST_SUCCESS =
  '@user/CHANGE_USER_PASSWORD_REQUEST_SUCCESS';
export const CHANGE_USER_PASSWORD_REQUEST_FAILURE =
  '@user/CHANGE_USER_PASSWORD_REQUEST_FAILURE';

export const UPDATE_AVATAR_REQUEST = '@user/UPDATE_AVATAR_REQUEST';
export const UPDATE_AVATAR_REQUEST_SUCCESS =
  '@user/UPDATE_AVATAR_REQUEST_SUCCESS';
export const UPDATE_AVATAR_REQUEST_FAILURE =
  '@user/UPDATE_AVATAR_REQUEST_FAILURE';


export interface ProfileUpdate {
  name: string;
  email: string;
  cellphone: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  cellphone: string;
  cpf: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateAvatarRequest {
  type: typeof UPDATE_AVATAR_REQUEST;
  payload: { encoded: string; name: string };
}

export interface UpdateAvatarRequestSuccess {
  type: typeof UPDATE_AVATAR_REQUEST_SUCCESS;
  payload: { encoded: string; name: string };
}

export interface UpdateAvatarRequestFailure {
  type: typeof UPDATE_AVATAR_REQUEST_FAILURE;
  payload: { message: string };
}

export interface ChangeUserPasswordRequest {
  type: typeof CHANGE_USER_PASSWORD_REQUEST;
  payload: {
    currentPassoword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
}

export interface ChangeUserPasswordRequestSuccess {
  type: typeof CHANGE_USER_PASSWORD_REQUEST_SUCCESS;
}

export interface ChangeUserPasswordRequestFailure {
  type: typeof CHANGE_USER_PASSWORD_REQUEST_FAILURE;
}

export interface UpdateProfileRequest {
  type: typeof UPDATE_PROFILE_REQUEST;
  payload: { profile: ProfileUpdate };
}

export interface UpdateProfileRequestSuccess {
  type: typeof UPDATE_PROFILE_REQUEST_SUCCESS;
  payload: { profile: ProfileUpdate };
}

export interface UpdateProfileRequestFailure {
  type: typeof UPDATE_PROFILE_REQUEST_FAILURE;
  payload: { message: string };
}


export interface LogoutAction {
  type: typeof AUTH_LOGOUT;
}

export type UserActionTypes =
  | LogoutAction
  | RequestLoginSuccessAction
  | UpdateProfileRequest
  | UpdateProfileRequestSuccess
  | UpdateProfileRequestFailure
  | ChangeUserPasswordRequest
  | ChangeUserPasswordRequestSuccess
  | ChangeUserPasswordRequestFailure
  | UpdateAvatarRequest
  | UpdateAvatarRequestSuccess
  | UpdateAvatarRequestFailure

export interface UserState {
  id: string;
  profile: {
    avatar: string | null;
    email: string | null;
    name: string | null;
    cpf: string | null;
    phone: string | null;
  };
  addressActive: string | null;
  error: string | null;
}
