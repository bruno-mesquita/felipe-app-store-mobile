import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Input = styled.TextInput.attrs(props => ({
  ...props,
  placeholderTextColor: '#727272',
}))`
  width: 90%;
  font-size: 16px;
`;

export const styles = StyleSheet.create({
  container: {
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 7,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    flexDirection: 'row',

    alignSelf: 'center',
    marginTop: 25
  },
});
