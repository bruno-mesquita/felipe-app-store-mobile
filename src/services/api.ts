import axios from 'axios';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

const api = axios.create({
  baseURL: Constants.manifest.extra?.apiUrl,
  headers: {
    appversion: Constants.manifest?.version,
    isdevice: Device.isDevice,
  },
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { token } = await store.dispatch(authActions.fetchRefreshToken()).unwrap();

//         return axios({
//           ...originalRequest,
//           headers: {
//             ...originalRequest.headers,
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       } catch (err) {
//         store.dispatch(authActions.logout());
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export const fetcher = (url: string) =>
  api.get(url).then(({ data }) => (data.result ? data.result : data));

export default api;
