import React from 'react';

import { Item } from './Components';

import { Container, Divider } from './styles';

export const Configuration = () => {
  return (
    <Container>
      <Item to="ChangePassword">Alterar senha</Item>
      <Divider />
      <Item to="TermsUse">Termos de uso</Item>
      <Divider />
      <Item to="AboutApp">Sobre o aplicativo</Item>
      <Divider />
    </Container>
  );
};
