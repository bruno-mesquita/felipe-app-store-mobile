import axios from 'axios';
import Constants from 'expo-constants';

import { getRefreshToken, removeToken, setToken, setRefreshToken, getToken } from '../utils/store';

const api = axios.create({
  baseURL: 'https://api.flippdelivery.com.br/api/app-store',
  headers: {
    api_version: Constants.manifest.version,
  }
});

// api.interceptors.request.use(async request => {
//   if(!request.headers?.Authorization) {
//     const token = await getToken();

//     if(token) request.headers.Authorization = `Bearer ${token}`;
//   }

//   if(!request.headers?.Authorization.split(' ')[1]) {
//     const token = await getToken();

//     if(token) request.headers.Authorization = `Bearer ${token}`;
//   }

//   return request;
// }, (error) => Promise.reject(error));

api.interceptors.response.use(response => response, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const refreshToken = await getRefreshToken();

    if (!refreshToken) await removeToken();

    try {
      const { data } = await api.post('/auth/refresh', { token: refreshToken });

      const { accessToken, refreshToken: newRefreshToken } = data.result;

      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      await setToken(accessToken);
      await setRefreshToken(newRefreshToken);

      return api(originalRequest);
    } catch (err) {
      await removeToken();
    }
  }
  return Promise.reject(error);
});

export default api;
