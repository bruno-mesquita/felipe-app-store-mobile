import type { PersistConfig } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

const persistConfig: PersistConfig<any> = {
  key: '@flipp-partners',
  storage,
  version: 1,
  whitelist: ['auth', 'tokenPush'],
};

export default persistConfig;
