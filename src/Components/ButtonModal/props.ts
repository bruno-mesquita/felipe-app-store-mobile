import { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

export interface ButtonModalProps extends TouchableOpacityProps {
  children: ReactNode;
}
