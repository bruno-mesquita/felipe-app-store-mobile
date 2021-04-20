import { TextInputMaskProps } from 'react-native-masked-text';

export interface FieldProps extends TextInputMaskProps {
  label: string;
  maskRef?: any;
  labelColor?: string;
}
