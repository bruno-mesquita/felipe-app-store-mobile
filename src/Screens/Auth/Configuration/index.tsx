import { useAuth } from '@contexts/AuthContext';
import { Item } from './Components';

import { Container, Divider } from './styles';

export const Configuration = () => {
  const { logout } = useAuth();

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
      <Item onPress={logout}>Sair do aplicativo</Item>
      <Divider />
    </Container>
  );
};
