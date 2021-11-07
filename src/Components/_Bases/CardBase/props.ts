import { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';

export type Props = FC<TouchableOpacityProps & { component?: 'button' | 'view' }>