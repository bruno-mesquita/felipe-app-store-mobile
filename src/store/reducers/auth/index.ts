import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

import api from '@services/api';
import type { RootState } from '../../store';

import { fetchLogin, fetchRefreshToken } from './thunks';
import type { IAuth } from './types';

const initialState: IAuth = {
  token: null,
  refreshToken: null,
  signed: false,
  establishmentExists: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    setEstablishmentExists: (state, action: PayloadAction<boolean>) => {
      state.establishmentExists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRefreshToken.rejected, () => {
      return initialState;
    });

    builder.addCase(fetchRefreshToken.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
    });

    builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.signed = true;
    });

    builder.addMatcher(
      (action) => action.type === REHYDRATE,
      (_, action: PayloadAction<RootState>) => {
        if (action.payload && action.payload?.auth) {
          const { auth } = action.payload;

          api.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
        }
      }
    );
  },
});

export const authActions = { ...auth.actions, fetchLogin, fetchRefreshToken };

export default auth.reducer;
