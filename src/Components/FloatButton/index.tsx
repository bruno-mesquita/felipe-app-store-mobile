import { Container } from './styles';
import { FloatButtonProps } from './props';

export const FloatButton = ({ onPress, children }: FloatButtonProps) => (
  <Container onPress={onPress}>{children}</Container>
);
