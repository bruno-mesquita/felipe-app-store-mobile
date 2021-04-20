import { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

export interface ItemProps extends TouchableOpacityProps {
  children: ReactNode;
}
