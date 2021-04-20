import { DefaultRootState } from 'react-redux';

import { AuthState } from '../store/ducks/auth/auth.types';

declare module 'react-redux' {
  interface DefaultRootState {
    auth: AuthState;
  }
}

export {};
