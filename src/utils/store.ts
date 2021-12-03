import * as SecureStore from 'expo-secure-store';

const FLIPP_AUTH_TOKEN = 'flipp-auth-token';
const FLIPP_AUTH_REFRESH_TOKEN = 'flipp-auth-refresh-token';

export const getToken = () => SecureStore.getItemAsync(FLIPP_AUTH_TOKEN);
export const setToken = (token: string) =>
  SecureStore.setItemAsync(FLIPP_AUTH_TOKEN, token);
export const removeToken = () => SecureStore.deleteItemAsync(FLIPP_AUTH_TOKEN);

export const getRefreshToken = () =>
  SecureStore.getItemAsync(FLIPP_AUTH_REFRESH_TOKEN);
export const setRefreshToken = (token: string) =>
  SecureStore.setItemAsync(FLIPP_AUTH_REFRESH_TOKEN, token);
export const removeRefreshToken = () =>
  SecureStore.deleteItemAsync(FLIPP_AUTH_REFRESH_TOKEN);

export const getExpoPushToken = () =>
  SecureStore.getItemAsync('flipp-expo-push-token');
export const setExpoPushToken = (expoPushToken: string) =>
  SecureStore.setItemAsync('flipp-expo-push-token', expoPushToken);
