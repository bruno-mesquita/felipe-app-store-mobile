import { ExpoConfig } from '@expo/config';

export default {
  name: 'Flipp - Partners',
  slug: 'flipp-partners',
  version: '1.0.0',
  jsEngine: 'hermes',
  orientation: 'portrait',
  icon: './src/assets/icons/logo.png',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'cover',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.partners.flipp',
  },
  android: {
    versionCode: 6,
    googleServicesFile: './google-services.json',
    adaptiveIcon: {
      backgroundColor: '#9E0404',
      foregroundImage: './src/assets/icons/logo.png',
    },
    package: 'com.partners.flipp',
  },
  extra: {
    apiUrl: process.env.API_URL ?? 'http://192.168.15.24:3030/api/app-store',
  },
} as ExpoConfig;
