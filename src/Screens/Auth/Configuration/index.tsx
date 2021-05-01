import React from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { logout } from '../../../Store/ducks/auth/auth.actions';
import { Item } from './Components';

import { Container, Divider } from './styles';

export const Configuration = () => {
  const dispatch = useDispatch();

  const quit = () => dispatch(logout());
  const notImplement = () => Alert.alert('Não implementada', 'Infelizmente a nossa equipe ainda não fez essa função :( ');

  return (
    <Container>
      <Item to="Profile">Meu perfil</Item>
      <Divider />
      <Item to="ChangePassword">Alterar senha</Item>
      <Divider />
      <Item onPress={notImplement}>Termos de uso</Item>
      <Divider />
      <Item to="AboutApp">Sobre o aplicativo</Item>
      <Divider />
      <Item onPress={quit}>Sair do aplicativo</Item>
      <Divider />
    </Container>
  );
};
