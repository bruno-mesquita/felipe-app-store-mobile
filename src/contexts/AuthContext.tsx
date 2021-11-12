import { useContext, createContext, FC, useState, useEffect } from 'react';

import * as store from '@utils/store';
import api from '@services/api';

interface AuthContextProps {
  signed: boolean;
  token: string;
  refreshToken: string;
  signIn: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  establishmentExists: boolean;
  setEstablishmentExists: (exists: boolean) => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: FC = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [establishmentExists, setEstablishmentExists] = useState(false);

  useEffect(() => {
    store.getToken().then(value => {
      if(value) {
        setToken(value);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        setSigned(true);
      }
    });
    store.getRefreshToken().then(value => {
      value && setRefreshToken(value);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post<{ token: string; refreshToken: string; }>('/auth/login', { email, password });
      setToken(data.token);
      setRefreshToken(data.refreshToken);
      await store.setToken(data.token);
      await store.setRefreshToken(data.refreshToken);

      api.defaults.headers.common.Authorization = `Bearer ${data.token}`

      setSigned(true);

      return true;
    } catch (err) {
      new Error();
      return false;
    }
  };

  const logout = async () => {
    await store.removeToken();
    await store.removeRefreshToken();
    setToken(null);
    setRefreshToken(null);
    setSigned(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signed,
        token,
        refreshToken,
        signIn,
        logout,
        establishmentExists,
        setEstablishmentExists
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
