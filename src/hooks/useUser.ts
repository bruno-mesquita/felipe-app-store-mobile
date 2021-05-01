import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { getApi } from '../services/api';
interface User {
    id: number;
    name: string;
    email: string;
    cellphone: string;
    openingTime: number;
    closingTime: number;
    freightValue: number;
    image: string;
    address: {
      id: number;
      street: string;
      number: string;
      neighborhood: string;
      cep: string;
      city: {
        id: number;
        name: string;
        state_id: number;
      }
    }
}

type UserAttributes = 'name' | 'email' | 'cellphone' | 'openingTime' | 'closingTime' | 'freightValue' | 'address' | 'image'

export const useUser = (selects: UserAttributes[] = []) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    cellphone: '',
    openingTime: 0,
    closingTime: 0,
    freightValue: 0,
    image: '',
    address: {
      id: 0,
      street: '',
      number: '',
      neighborhood: '',
      cep: '',
      city: {
        id: 0,
        name: '',
        state_id: 0,
      }
    }
  });

  useEffect(() => {
    const api = getApi();

    if(selects.length !== 0) {
      api.post('/establisments/me', { selects })
        .then(({ data }) => setUser(data.result))
        .catch(() => Alert.alert('Erro', 'Parece que houve um erro ao buscar os seus dados :('));
    }
  }, [])

  return user;
}
