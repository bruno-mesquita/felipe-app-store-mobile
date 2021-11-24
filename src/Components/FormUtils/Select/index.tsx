import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

import { SelectProps } from './props';
import styles, { Container, Label } from './styles';

export const Select = ({
  onChange = (value) => {},
  value,
  placeholder = 'Selecione um item',
  label,
  labelColor = '#fff',
  items,
  disabled = false,
}: SelectProps) => {
  return (
    <Container>
      <Label style={labelColor ? { color: labelColor } : {}}>{label}</Label>
      <RNPickerSelect
        disabled={disabled}
        style={styles}
        value={value}
        onValueChange={onChange}
        items={items}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: placeholder, value: null }}
        Icon={() => (
          <Ionicons
            name="chevron-down-outline"
            size={20}
            color="#C4C4C4"
            style={{ paddingRight: 10 }}
          />
        )}
      />
    </Container>
  );
};
