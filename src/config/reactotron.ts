import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'Flipp-Delivery-Store' })
  .useReactNative()
  .use(reactotronRedux())
  .use(reactotronSaga({}))
  .connect();

tron.clear();

console.tron = tron;
