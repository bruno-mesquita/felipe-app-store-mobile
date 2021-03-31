import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

const persistReducers = (reducers: any) => {
  return persistReducer(
    {
      key: 'flipp-delivery',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );
};

export default persistReducers;
