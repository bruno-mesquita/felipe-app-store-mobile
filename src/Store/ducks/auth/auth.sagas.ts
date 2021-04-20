import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { DefaultRootState } from 'react-redux';

import api from '../../../services/api';
import {
  requestLoginFailure,
  requestLoginSuccess,
  logout,
} from './auth.actions';
import { RequestLoginAction, AUTH_REQUEST_LOGIN } from './auth.types';

export function* signIn({ payload }: RequestLoginAction) {
  try {
    const { email, password, checked } = payload;

    const { data } = yield call(api.post, '/auth/login', {
      email,
      password,
    });

    const { token } = data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(requestLoginSuccess(token, checked));
  } catch (err) {
    Alert.alert('Erro no login');
    yield put(requestLoginFailure(err.message));
  }
}

export function* setToken({ payload }: { payload: DefaultRootState }) {
  if (!payload) return;

  const { token, keepMeConnected } = payload.auth;

  if (token && keepMeConnected) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    yield put(logout());
  }
}

export default all([
  takeLatest('persist/REHYDRATE' as any, setToken),
  takeLatest(AUTH_REQUEST_LOGIN as any, signIn),
]);
