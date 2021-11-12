import { useCallback, useEffect, useState } from 'react';
import { Alert, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import api from '@services/api';
import { ModalBase } from '../../../ModalBase';

import { ModalCategoriesProps, Category } from './props';
import { Container, Title, Row, Button } from './styles';

export const ModalCategories = ({ modalRef, onPress, categories: items, id }: ModalCategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [originList, setOriginList] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category[]>([]);

  const getCategories = useCallback(async () => {
    try {
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
  }, [items, originList])

  const add = async (categoryId: number) => {
    try {
      await api.post(`/establishments-categories/${categoryId}`);

      return true;
    } catch (err) {
      Alert.alert('Erro', 'Erro ao adicionar a lista')
      return false;
    }
  };

  const remove = async (categoryId: number) => {
    try {
      await api.delete(`/establishments-categories/${categoryId}`);

      return true;
    } catch (err) {
      Alert.alert('Erro', 'Erro ao remover a lista')
      return false;
    }
  };


  const addList = (category: Category) => async () => {
    if(id) {
      const result = await add(category.id);

      if(result) {
        setCategories(old => old.filter(item => item.id !== category.id));
        setSelected(old => [...old, category]);
      }
    } else {
      setCategories(old => old.filter(item => item.id !== category.id));
      setSelected(old => [...old, category]);
    }
  };

  const removeList = (category: Category) => async () => {
    if(id) {
      const result = await remove(category.id);

      if(result) {
        setCategories(old => [...old, category]);
        setSelected(old => old.filter(item => item.id !== category.id));
      }
    } else {
      setCategories(old => [...old, category]);
      setSelected(old => old.filter(item => item.id !== category.id));
    }
  };

  const onSubmit = () => {
    onPress(selected.map(e => e.id));
    modalRef.current?.close();
  };

  return (
    <ModalBase ref={modalRef}>
      <Container>
        <ScrollView>
          <Title>Categorias</Title>
          {categories.map(category => (
            <Row key={category.id.toString()}>
              <Text key={category.id}>{category.name}</Text>
              <TouchableOpacity onPress={addList(category)}>
                <Ionicons name="add-circle" size={25} />
              </TouchableOpacity>
            </Row>
          ))}

          <Title>Selecionados</Title>
          {selected.map(category => (
            <Row key={category.id.toString()}>
              <Text key={category.id}>{category.name}</Text>
              <TouchableOpacity onPress={removeList(category)}>
                <Ionicons name="remove-circle" size={25} />
              </TouchableOpacity>
            </Row>
          ))}
          <Button onPress={onSubmit}>Selecionar</Button>
        </ScrollView>
      </Container>
    </ModalBase>
  )
};
