import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../../../Store/ducks/auth/auth.actions';
import { Item } from './Components';

import { Container, Divider } from './styles';

export const Configuration = () => {
  const dispatch = useDispatch();

  const quit = () => dispatch(logout());

  return (
    <Container>
      <Item to="Profile">Meus dados</Item>
      <Divider />
      <Item to="ChangePassword">Alterar senha</Item>
      <Divider />
      <Item to="TermsUse">Termos de uso</Item>
      <Divider />
      <Item to="AboutApp">Sobre o aplicativo</Item>
      <Divider />
      <Item onPress={quit}>Sair do aplicativo</Item>
      <Divider />
    </Container>
  );
};
