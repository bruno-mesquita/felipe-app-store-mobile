import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Divider, Fab, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import useGetMenus from '@hooks-api/useGetMenus';

import { Item, ListEmpty } from './Components';

export const Menus = ({ navigation }) => {
  const { data, isValidating, mutate } = useGetMenus();

  const onRefresh = async () => {
    await mutate();
  };

  const ItemSeparatorComponent = useCallback(() => <Divider my="5px" />, []);

  return (
    <>
      <FlatList
        style={{
          flex: 1,
          paddingVertical: 10,
        }}
        ListEmptyComponent={ListEmpty}
        refreshing={isValidating}
        onRefresh={onRefresh}
        data={data}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => <Item item={item} reender={onRefresh} />}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
      <Fab
        onPress={() => navigation.navigate('RegisterMenu')}
        bg="#9E0404"
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={Ionicons} name="add" size="sm" />}
      />
    </>
  );
};
