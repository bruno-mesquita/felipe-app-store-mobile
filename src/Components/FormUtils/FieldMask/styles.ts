import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

export const TextField = styled(TextInputMask).attrs((props) => ({
  placeholderTextColor: '#C4C4C4',
  ...props,
}))`
  padding: 9px 8px;
  border-radius: 5px;
  background-color: #770202;
  color: #fff;
  width: 100%;
`;
