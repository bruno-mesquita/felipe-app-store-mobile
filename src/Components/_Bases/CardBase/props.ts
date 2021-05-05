import { TouchableOpacityProps } from 'react-native';

import { Props as DefaultProps } from '../../../utils/props';

export interface Props extends DefaultProps, TouchableOpacityProps {
  component?: 'button' | 'view'
}
