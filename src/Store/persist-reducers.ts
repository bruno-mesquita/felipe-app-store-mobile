import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

const persistReducers = (reducers: any) => {
  return persistReducer(
    {
      key: '@flipp-delivery/store',
      storage: AsyncStorage,
      whitelist: ['auth'],
    },
    reducers,
  );
};

export default persistReducers;
