import axios, { AxiosInstance } from 'axios';

import { store } from '../Store/store';
import { requestRefreshTokenSuccess, logout } from '../Store/ducks/auth/auth.actions';
import { api_url } from '../../env.json';

let api: AxiosInstance;

const createApi = () => {
  api = axios.create({ baseURL: api_url });

  api.interceptors.response.use((response) => {
    return response
  }, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;

        const { refreshToken } = (store.getState() as any).auth;

        if(!refreshToken) store.dispatch(logout());

        const { data } = await api.post('/auth/refresh', { token: refreshToken })

        const { accessToken, refreshToken: newRefreshToken } = data.result;

        api.defaults.headers.Authorization = `Bearer ${accessToken}`;

        store.dispatch(requestRefreshTokenSuccess(accessToken, newRefreshToken));

        return axios(originalRequest);
      } catch (err) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  });
}

const getApi = () => {
  if(!api) createApi();

  return api;
};

export { createApi, getApi };
