import storage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: '@flipp-partners',
  storage,
  version: 1,
  whitelist: ['auth'],
};

export default persistConfig;
