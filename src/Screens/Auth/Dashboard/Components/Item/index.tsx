import { useAppSelector } from '@store/hooks';

import { Container } from './styles';
import type { ItemProps } from './props';

export const Item = ({ children, never, ...rest }: ItemProps) => {
  const { establishmentExists } = useAppSelector((store) => store.auth);

  return (
    <Container
      disabled={!establishmentExists && !never}
      style={!establishmentExists && !never ? { backgroundColor: '#c4c4c4' } : {}}
      {...(rest as any)}
    >
      {children}
    </Container>
  );
};
