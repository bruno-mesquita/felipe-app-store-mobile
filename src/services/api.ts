import axios from 'axios';
import Constants from 'expo-constants';

import { getRefreshToken, removeToken, setToken, setRefreshToken, getToken } from '../utils/store';
import { store } from '@store/store';
import { authActions } from '@store/reducers/auth';

const api = axios.create({
  baseURL: Constants.manifest.extra.apiUrl,
  headers: {
    api_version: Constants.manifest.version,
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken } = store.getState().auth;

      try {
        const response = await fetch(`${Constants.manifest.extra.apiUrl}/auth/refresh`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: refreshToken }),
        });

        const data = await response.json();

        const { accessToken, refreshToken: newRefreshToken } = data.result;

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        store.dispatch(
          authActions.setTokens({
            token: accessToken,
            refreshToken: newRefreshToken,
          })
        );

        return axios({
          ...originalRequest,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (err) {
        await removeToken();
        return Promise.reject(error);
      }
    }

    await removeToken();
    return Promise.reject(error);
  }
);

export default api;
