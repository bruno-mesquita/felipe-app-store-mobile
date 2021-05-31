import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { getApi } from '../services/api';
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  cellphone: string;
  cpf: string;
}

type UserAttributes = 'first_name' | 'last_name' | 'email' | 'cellphone' | 'cpf';

export const useUser = (selects: UserAttributes[] = []) => {
  const [user, setUser] = useState<User>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    cellphone: '',
    cpf: '',
  });

  useEffect(() => {
    const api = getApi();

    if(selects.length !== 0) {
      api.post('/owners/me', { selects })
        .then(({ data }) => setUser(data.result))
        .catch(() => Alert.alert('Erro', 'Parece que houve um erro ao buscar os seus dados :('));
    }
  }, [])

  return user;
}
