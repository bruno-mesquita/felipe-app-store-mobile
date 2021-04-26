import { ReactNode } from 'react';

export interface ItemProps {
  children: ReactNode;
  to?: string | undefined;
  onPress?: () => void | undefined;
}
