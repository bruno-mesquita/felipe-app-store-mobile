export const AUTH_REQUEST_LOGIN = '@auth/REQUEST_LOGIN';
export const AUTH_REQUEST_LOGIN_SUCCESS = '@auth/REQUEST_LOGIN_SUCCESS';
export const AUTH_REQUEST_LOGIN_FAILURE = '@auth/REQUEST_LOGIN_FAILURE';
export const AUTH_LOGOUT = '@auth/LOGOUT';
export const AUTH_REFRESH_TOKEN_SUCCESS = '@auth/REFRESH_TOKEN_SUCCESS';

export interface RequestLoginAction {
  type: typeof AUTH_REQUEST_LOGIN;
  payload: { email: string; password: string; checked: boolean };
}

export interface RequestLoginSuccessAction {
  type: typeof AUTH_REQUEST_LOGIN_SUCCESS;
  payload: { token: string; refreshToken: string; checked: boolean };
}

export interface RequestLoginFailureAction {
  type: typeof AUTH_REQUEST_LOGIN_FAILURE;
  payload: { errorMessage: string };
}

export interface LogoutAction {
  type: typeof AUTH_LOGOUT;
}


export interface RequestRefreshTokenSuccessAction {
  type: typeof AUTH_REFRESH_TOKEN_SUCCESS;
  payload: { refreshToken: string; accessToken: string; }
}


export type AuthActionTypes =
  | RequestLoginAction
  | RequestLoginSuccessAction
  | RequestLoginFailureAction
  | LogoutAction
  | RequestRefreshTokenSuccessAction

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  logged: boolean;
  keepMeConnected: boolean;
  loading: boolean;
}
