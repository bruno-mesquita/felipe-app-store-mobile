import axios from 'axios';
import { store } from '../Store/store';

import { requestRefreshTokenSuccess, logout } from '../Store/ducks/auth/auth.actions';

const api = axios.create({
  baseURL: 'http://192.168.1.102:3030/api/app-store',
});


api.interceptors.response.use((response) => {
  return response
}, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {

    originalRequest._retry = true;

    const { refreshToken } = (store.getState() as any).auth;

    if(!refreshToken) store.dispatch(logout());

    const { data } = await api.post('/auth/refresh', { token: refreshToken })

    const { accessToken, refreshToken: newRefreshToken } = data.result;

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;

    store.dispatch(requestRefreshTokenSuccess(accessToken, newRefreshToken));

    return axios(originalRequest);
   }
   return Promise.reject(error);
});

export default api;
