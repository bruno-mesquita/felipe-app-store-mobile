import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 7,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    marginBottom: 30,
  },
});

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.third};
  border-radius: 50px;
  align-self: center;
`;

export const Text = styled.Text`
  align-self: center;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #fff;
`;
