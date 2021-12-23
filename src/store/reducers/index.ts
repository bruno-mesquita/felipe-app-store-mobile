import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth';
import pushToken from './pushToken';

const rootReducer = combineReducers({ auth, pushToken });

export default rootReducer;
