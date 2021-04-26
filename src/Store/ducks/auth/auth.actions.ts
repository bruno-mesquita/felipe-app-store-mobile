import {
  AUTH_LOGOUT,
  AUTH_REQUEST_LOGIN,
  AUTH_REQUEST_LOGIN_SUCCESS,
  AUTH_REQUEST_LOGIN_FAILURE,
  AUTH_REFRESH_TOKEN_SUCCESS,
  AuthActionTypes,
} from './auth.types';

export const requestLogin = (
  email: string,
  password: string,
  checked: boolean,
): AuthActionTypes => ({
  type: AUTH_REQUEST_LOGIN,
  payload: { email, password, checked },
});

export const requestLoginSuccess = (
  token: string,
  refreshToken: string,
  checked: boolean,
): AuthActionTypes => ({
  type: AUTH_REQUEST_LOGIN_SUCCESS,
  payload: { token, checked, refreshToken },
});

export const requestLoginFailure = (errorMessage: string): AuthActionTypes => ({
  type: AUTH_REQUEST_LOGIN_FAILURE,
  payload: { errorMessage },
});

export const logout = (): AuthActionTypes => ({
  type: AUTH_LOGOUT,
});

export const requestRefreshTokenSuccess = (accessToken: string, refreshToken: string):  AuthActionTypes => ({
  type: AUTH_REFRESH_TOKEN_SUCCESS,
  payload: { refreshToken, accessToken }
})
