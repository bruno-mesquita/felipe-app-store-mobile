export const AUTH_REQUEST_LOGIN = '@auth/REQUEST_LOGIN';
export const AUTH_REQUEST_LOGIN_SUCCESS = '@auth/REQUEST_LOGIN_SUCCESS';
export const AUTH_REQUEST_LOGIN_FAILURE = '@auth/REQUEST_LOGIN_FAILURE';
export const AUTH_LOGOUT = '@auth/LOGOUT';

export interface RequestLoginAction {
  type: typeof AUTH_REQUEST_LOGIN;
  payload: { email: string; password: string; checked: boolean };
}

export interface RequestLoginSuccessAction {
  type: typeof AUTH_REQUEST_LOGIN_SUCCESS;
  payload: { token: string; checked: boolean };
}

export interface RequestLoginFailureAction {
  type: typeof AUTH_REQUEST_LOGIN_FAILURE;
  payload: { errorMessage: string };
}

export interface LogoutAction {
  type: typeof AUTH_LOGOUT;
}

export type AuthActionTypes =
  | RequestLoginAction
  | RequestLoginSuccessAction
  | RequestLoginFailureAction
  | LogoutAction;

export interface AuthState {
  token: string | null;
  logged: boolean;
  keepMeConnected: boolean;
  loading: boolean;
}
