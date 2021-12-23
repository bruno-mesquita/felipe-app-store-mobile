import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

import api from '@services/api';
import type { RootState } from '../store';

type IAuth = {
  token: string;
  refreshToken: string;
  signed: boolean;
  establishmentExists: boolean;
};

const initialState = { token: null, refreshToken: null, signed: false, establishmentExists: false } as IAuth;

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<Pick<IAuth, 'token' | 'refreshToken'>>) => {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.signed = true;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.signed = false;
    },
    setEstablishmentExists: (state, action: PayloadAction<boolean>) => {
      state.establishmentExists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === REHYDRATE,
      (state, action: PayloadAction<RootState>) => {
        if (action.payload && action.payload?.auth) {
          const { auth } = action.payload;

          api.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
        }
      }
    );
  },
});

export const authActions = auth.actions;

export default auth.reducer;
