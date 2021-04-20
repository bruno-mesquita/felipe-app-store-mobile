import { Item } from 'react-native-picker-select';

export interface SelectProps {
  path?: string;
  value: string;
  onChange: (value: any) => void;
  placeholder?: string;
  label: string;
  labelColor?: string | undefined;
  items?: Item[] | undefined;
}
