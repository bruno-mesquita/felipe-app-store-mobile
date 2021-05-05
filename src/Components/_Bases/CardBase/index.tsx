import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Props } from './props';
import styles from './styles';

export const CardBase = ({ children, style, component = 'button', ...rest }: Props) => {
  return (
    <>
      {component === 'button' ? (
        <TouchableOpacity {...rest} style={[styles.container, style]}>
          {children}
        </TouchableOpacity>
      ) : (
        <View {...rest} style={[styles.container, style]}>
          {children}
        </View>
      )}
    </>
  );
};

