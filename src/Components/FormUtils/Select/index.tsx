import { useEffect, useState, useCallback } from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

import { getApi } from '../../../services/api';
import { SelectProps } from './props';
import styles, { Container, Label } from './styles';

export const Select = ({
  onChange,
  path,
  value,
  placeholder = 'Selecione um item',
  label,
  labelColor = '#fff',
  items: myItems,
}: SelectProps) => {
  const [items, setItems] = useState<Item[]>([]);

  const getItems = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get(path);

      setItems(data.result.map(item => ({ value: String(item.id), label: item.name })));
    } catch (err) {
    }
  }, [path]);

  useEffect(() => {
    if (myItems && !path) {
      setItems(myItems);
    } else {
      getItems();
    }
  }, [path, value]);

  const myChange = (e) => {
    if(e) onChange(e)
  }

  return (
    <Container>
      <Label style={labelColor ? { color: labelColor } : {}}>{label}</Label>
      <RNPickerSelect
        style={styles}
        value={value}
        onValueChange={myChange}
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
