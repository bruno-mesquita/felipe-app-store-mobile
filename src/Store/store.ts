import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './create-store';
import persistReducers from './persist-reducers';

import rootReducer from './ducks/root-reducer';
import rootSaga from './ducks/root-saga';

const sagaMonitor = console.tron.createSagaMonitor();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor, store };
