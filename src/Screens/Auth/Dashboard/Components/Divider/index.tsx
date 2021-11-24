import { View, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';

export const Divider = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        width: width * 0.27,
        height: 7,
      }}
    ></View>
  );
};
