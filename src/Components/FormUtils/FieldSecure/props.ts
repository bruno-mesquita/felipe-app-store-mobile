import { TextInputProps } from 'react-native';

export interface FieldProps extends TextInputProps {
  label: string;
  labelColor?: string | undefined;
}
