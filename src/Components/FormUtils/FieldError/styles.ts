import { Text } from 'react-native';
import styled from 'styled-components/native';
import { ErrorMessage } from 'formik';

export const Container = styled(ErrorMessage).attrs(props => ({
  ...props,
  component: Text,
}))`
  align-self: center;
`;
