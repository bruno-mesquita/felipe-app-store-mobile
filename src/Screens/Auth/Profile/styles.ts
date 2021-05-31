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

export const Form = styled.View`
  flex: 1;
  justify-content: space-around;
  padding: 25px 25px 0px 25px;
`;
