import { Container, ContainerLogo, Logo, BackGround } from './styles';
import { LayoutProps } from './props';

export const Layout = ({ children }: LayoutProps) => (
  <Container>
    <BackGround style={{ flex: 1 }} source={require('../../../assets/images/fundo.png')}>
      <ContainerLogo>
        <Logo source={require('../../../assets/images/logo-flipp.png')} />
      </ContainerLogo>
      {children}
    </BackGround>
  </Container>
);
