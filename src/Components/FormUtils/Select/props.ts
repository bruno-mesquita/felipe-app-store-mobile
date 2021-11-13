import { Item } from 'react-native-picker-select';

export interface SelectProps {
  value: string;
  onChange?: (value: any) => void;
  placeholder?: string;
  label: string;
  labelColor?: string | undefined;
  items?: Item[] | undefined;
  disabled?: boolean;
}
