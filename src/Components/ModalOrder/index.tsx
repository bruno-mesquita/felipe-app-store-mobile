import { useState, useEffect } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { Flex, useToast, Text } from 'native-base';

import { ModalBase } from '../ModalBase';
import { ButtonModal } from '../ButtonModal';
import formatNumber from '../../utils/format-number';

import { ItemModalProps, ItemOrder, Order } from './props';
import api from '@services/api';

export const ModalOrder = ({ modalRef, id, reender }: ItemModalProps) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const toast = useToast();

  const [order, setOrder] = useState<Order>({
    id: 0,
    total: 0,
    order_status: '',
    note: '',
    transshipment: 0,
  });
  const [items, setItems] = useState<ItemOrder[]>([]);

  const onClose = () => modalRef.current.close();

  useEffect(() => {
    if (id) {
      api
        .get(`/orders/${id}`)
        .then(({ data }) => {
          setItems(data.result.items);
          setOrder(data.result.order);
        })
        .catch(() => {
          toast.show({
            title: 'Erro',
            description: 'Erro ao buscar pedido',
            status: 'error',
          });
        });
    }
  }, [id]);

  const accept = async () => {
    try {
      await api.put(`/orders/${id}`);

      onClose();
      reender();
    } catch (err) {
      toast.show({
        title: 'Erro',
        description: 'Houve um erro ao aceitar o pedido',
        status: 'error',
      });
    }
  };

  const refuse = async () => {
    try {
      await api.put(`/orders/${id}/cancel`);

      onClose();
      reender();
    } catch (err) {
      toast.show({
        title: 'Erro',
        description: 'Houve um erro ao recusar o pedido',
        status: 'error',
      });
    }
  };

  const CloseButton = () => (
    <TouchableOpacity
      onPress={onClose}
      style={{ alignSelf: 'flex-end', paddingBottom: 10 }}
    >
      <Ionicons name="close-circle" size={25} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <ModalBase ref={modalRef}>
      <Flex w={`${width * 0.8}px`} h="auto" p="15px">
        <CloseButton />
        {items.map((item) => (
          <Flex
            direction="row"
            justify="space-between"
            pb="10px"
            align="baseline"
            key={item.id}
          >
            <Text>{`${item.quantity}x ${item.product.name}`}</Text>
            <Text>{formatNumber(item.total)}</Text>
          </Flex>
        ))}

        <Text alignSelf="flex-end">{formatNumber(order.total)}</Text>
        {order.transshipment !== 0 ? (
          <Text alignSelf="flex-end">
            {' '}
            {`Troco ${formatNumber(order.transshipment)}`}
          </Text>
        ) : null}

        {order.note && order.note !== '' ? (
          <Flex py="10px">
            <Text>Obs: {order.note}</Text>
          </Flex>
        ) : null}

        {order.order_status !== 'Finalizado' && order.order_status !== 'Cancelado' ? (
          <Flex
            direction="row"
            justify="space-between"
            pt="15px"
            style={order.order_status !== 'Aberto' ? { alignSelf: 'flex-end' } : {}}
          >
            {order.order_status === 'Aberto' ? (
              <ButtonModal style={{ width: '30%', marginBottom: 0 }} onPress={refuse}>
                Recusar
              </ButtonModal>
            ) : null}
            <ButtonModal style={{ width: '30%', marginBottom: 0 }} onPress={accept}>
              {order.order_status === 'Aberto' ? 'Aceitar' : 'Avançar'}
            </ButtonModal>
          </Flex>
        ) : null}
      </Flex>
    </ModalBase>
  );
};
