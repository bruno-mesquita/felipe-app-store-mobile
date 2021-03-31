import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import {
  Container,
  List,
  ListItem,
  ListItemText,
  User,
  UserAvatar,
  Divider,
} from './styles';

import { logout } from '../../Store/ducks/auth/auth.actions';

export const Drawer = (props: DrawerContentComponentProps<DrawerContentOptions>) => {
  const dispatch = useDispatch();

  const avatar = useSelector(({ user }) => user.profile.avatar);

  const goLogout = () => {
    dispatch(logout());
  };

  const goProfile = () => {
    props.navigation.navigate('Profile');
  };

  const goConfiguration = () => {
    props.navigation.navigate('Configuration');
  };

  return (
    <Container {...props}>
      <User>
        <UserAvatar
          source={avatar ? { uri: avatar } : require('../../assets/mocks/perfil.jpeg')}
        />
      </User>
      <List>
        <ListItem onPress={goProfile}>
          <ListItemText>Meus dados</ListItemText>
          <Divider />
        </ListItem>
        <ListItem onPress={goConfiguration}>
          <ListItemText>Configurações</ListItemText>
          <Divider />
        </ListItem>
        <ListItem onPress={goLogout}>
          <ListItemText>Sair</ListItemText>
        </ListItem>
      </List>
    </Container>
  );
};
