import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '@services/api';

import type {
  IFetchLoginPlayload,
  IFetchLoginReturned,
  IFetchRefreshTokenReturned,
} from './types';

export const fetchLogin = createAsyncThunk<IFetchLoginReturned, IFetchLoginPlayload>(
  'auth/refresh',
  async (payload) => {
    const { data } = await api.post<IFetchLoginReturned>('/auth/login', payload);

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    return data;
  }
);

export const fetchRefreshToken = createAsyncThunk<IFetchRefreshTokenReturned>(
  'auth/login',
  async (_, thunkAPI) => {
    const { refreshToken } = (thunkAPI.getState() as any).auth;

    const { data } = await api.post<IFetchRefreshTokenReturned>('/auth/refresh', {
      token: refreshToken,
    });

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    return data;
  }
);
