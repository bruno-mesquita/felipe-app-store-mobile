import React, { useEffect, useState, useCallback } from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

import api from '../../../services/api';
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
      const { data } = await api.get(path);

      setItems(data.result.map(item => ({ value: item.id, label: item.name })));
    } catch (err) {
      console.log(err.response.data);
    }
  }, [path]);

  useEffect(() => {
    if (myItems && !path) {
      setItems(myItems);
    } else {
      getItems();
    }
  }, [getItems, value]);

  return (
    <Container>
      <Label style={labelColor ? { color: labelColor } : {}}>{label}</Label>
      <RNPickerSelect
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
