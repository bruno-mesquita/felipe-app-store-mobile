import { TouchableOpacity, View } from 'react-native';

import { Props } from './props';
import styles from './styles';

export const CardBase: Props = ({
  children,
  style,
  component = 'button',
  ...rest
}) => {
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
