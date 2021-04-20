import { all } from 'redux-saga/effects';

import auth from './auth/auth.sagas';

export default function* rootSaga() {
  return yield all([auth]);
}
