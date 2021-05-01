import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  shadow: {
    elevation: 7,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
});

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Tabs = styled.View.attrs(props => ({
  ...props,
}))`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

