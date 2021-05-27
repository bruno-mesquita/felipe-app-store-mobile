import {
  AuthActionTypes,
} from './auth.types';

export const requestLogin = (
  email: string,
  password: string,
  checked: boolean,
): AuthActionTypes => ({
  type: '@auth/REQUEST_LOGIN',
  payload: { email, password, checked },
});

export const requestLoginSuccess = (
  token: string,
  refreshToken: string,
  checked: boolean,
): AuthActionTypes => ({
  type: '@auth/REQUEST_LOGIN_SUCCESS',
  payload: { token, checked, refreshToken },
});

export const requestLoginFailure = (errorMessage: string): AuthActionTypes => ({
  type: '@auth/REQUEST_LOGIN_FAILURE',
  payload: { errorMessage },
});

export const logout = (): AuthActionTypes => ({
  type: '@auth/LOGOUT',
});

export const requestRefreshTokenSuccess = (accessToken: string, refreshToken: string):  AuthActionTypes => ({
  type: '@auth/REFRESH_TOKEN_SUCCESS',
  payload: { refreshToken, accessToken }
})

export const requestEstablishmentExistsSuccess = (exists: boolean): AuthActionTypes => ({
  type: '@auth/REQUEST_ESTABLISHENT_EXISTS_SUCCESS',
  payload: { exists },
});
