import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ModalBase } from '../../../ModalBase';
import { getApi } from '../../../../services/api';

import { ModalCategoriesProps, Category } from './props';
import { Container, Title, Row, Button } from './styles';

export const ModalCategories = ({ modalRef, onPress, categories: items }: ModalCategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [originList, setOriginList] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category[]>([]);

  const getCategories = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get('/categories');

      setCategories(data.result);
      setOriginList(data.result);
    } catch (err) {
      Alert.alert('Erro', 'Erro ao listar categorias');
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if(items.length > 0) {
      setSelected(originList.filter(c => !!items.find(i => i === c.id)))
      setCategories(originList.filter(c => !items.find(i => i === c.id)));
    }
  }, [items])


  const add = (category: Category) => () => {
    setCategories(old => old.filter(item => item.id !== category.id));
    setSelected(old => [...old, category]);
  };

  const remove = (category: Category) => () => {
    setCategories(old => [...old, category]);
    setSelected(old => old.filter(item => item.id !== category.id));
  };

  const onSubmit = () => {
    onPress(selected.map(e => e.id));
    modalRef.current?.close();
  };

  return (
    <ModalBase ref={modalRef}>
      <Container>
        <ScrollView>
          <Title>Categories</Title>
          {categories.map(category => (
            <Row key={category.id.toString()}>
              <Text key={category.id}>{category.name}</Text>
              <Ionicons name="add-circle" size={25} onPress={add(category)} />
            </Row>
          ))}

          <Title>Selecionados</Title>
          {selected.map(category => (
            <Row key={category.id.toString()}>
              <Text key={category.id}>{category.name}</Text>
              <Ionicons name="remove-circle" size={25} onPress={remove(category)} />
            </Row>
          ))}
          <Button onPress={onSubmit}>Selecionar</Button>
        </ScrollView>
      </Container>
    </ModalBase>
  )
};
