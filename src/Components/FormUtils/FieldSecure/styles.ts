import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled.View`
  height: 69px;
  margin: 4px;
  width: 100%;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-bottom: 2px;
`;

export const ContainerTextField = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: #770202;

  padding-left: 10px;
  padding-right: 10px;
`;

export const TextField = styled(TextInput).attrs((props) => ({
  placeholderTextColor: '#C4C4C4',
  ...props,
}))`
  height: 43px;
  border-radius: 10px;
  background-color: #770202;
  color: #fff;
  width: 70%;
`;
