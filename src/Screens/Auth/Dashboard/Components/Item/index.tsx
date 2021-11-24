import { useAuth } from '@contexts/AuthContext';

import { Container } from './styles';
import { ItemProps } from './props';

export const Item = ({ children, never, ...rest }: ItemProps) => {
  const { establishmentExists } = useAuth();

  return (
    <Container
      disabled={!establishmentExists && !never}
      style={
        !establishmentExists && !never ? { backgroundColor: '#c4c4c4' } : {}
      }
      {...(rest as any)}
    >
      {children}
    </Container>
  );
};
