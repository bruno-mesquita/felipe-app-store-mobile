import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Props } from './props';
import styles from './styles';

export const CardBase = ({ children, style, ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest} style={[styles.container, style]}>
      {children}
    </TouchableOpacity>
  );
};

