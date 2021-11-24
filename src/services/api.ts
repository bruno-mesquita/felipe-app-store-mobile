import axios from 'axios';
import Constants from 'expo-constants';

import {
  getRefreshToken,
  removeToken,
  setToken,
  setRefreshToken,
  getToken,
} from '../utils/store';

const BASE_URL = 'https://api.flippdelivery.com.br/api/app-store';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    api_version: Constants.manifest.version,
  },
});

api.interceptors.request.use(
  async (request) => {
    const { Authorization = null } = request.headers;

    if (!Authorization) {
      const token = await getToken();

      if (token) request.headers.Authorization = `Bearer ${token}`;
    } else if (!Authorization.split(' ')[1]) {
      const token = await getToken();

      if (token) request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await getRefreshToken();

      if (!refreshToken) await removeToken();

      try {
        const response = await fetch(`${BASE_URL}/auth/refresh`, {
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

        await setToken(accessToken);
        await setRefreshToken(newRefreshToken);

        return axios(originalRequest);
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
