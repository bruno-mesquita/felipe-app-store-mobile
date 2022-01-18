import axios from 'axios';
import Constants from 'expo-constants';

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

      try {
        const { token } = await store.dispatch(authActions.fetchRefreshToken()).unwrap();

        return axios({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        store.dispatch(authActions.logout());
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
