import storage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: '@flipp-partners',
  storage,
  whitelist: ['auth'],
};

export default persistConfig;
