import { useAppDispatch } from '@store/hooks';
import { authActions } from '@store/reducers/auth';

import { Item } from './Components';
import { Container, Divider } from './styles';

export const Configuration = () => {
  const dispatch = useAppDispatch();

  const logout = () => dispatch(authActions.logout());

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
