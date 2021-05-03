import React, { useState, useEffect } from 'react';

import { ModalBase } from '../../../../../Components';

import { Content } from './styles';
import { ItemModalProps } from './props';
import { getApi } from '../../../../../services/api';
import { Alert } from 'react-native';

export const ItemModal = ({ modalRef, id }: ItemModalProps) => {
  const [item, setItem] = useState<any>();

  useEffect(() => {
    const api = getApi();

    api.get(`/orders/${id}`)
      .then(({ data }) => setItem(data.result))
      .catch(err => Alert.alert('Erro', 'Erro ao buscar pedido', [
        {
          onPress: () => modalRef.current?.close(),
          text: 'Sair'
        }
      ]))
  }, []);

  return (
    <ModalBase ref={modalRef}><Content></Content></ModalBase>
  )
}
