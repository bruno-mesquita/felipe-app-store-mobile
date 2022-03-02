import type { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: 'Flipp - Partners',
  slug: 'flipp-partners',
  ...config,
  extra: {
    apiUrl: process.env.API_URL ?? 'http://192.168.15.24:3030/api/app-store',
  },
});
