import axios from 'axios';
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: 'https://api.flippdelivery.com.br/api/app-store',
  headers: {
    appversion: Constants.manifest.version,
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

export const fetcher = (url) =>
  api.get(url).then(({ data }) => (data.result ? data.result : data));

export default api;
