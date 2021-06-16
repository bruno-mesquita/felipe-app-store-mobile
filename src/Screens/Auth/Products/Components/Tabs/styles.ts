import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs(props => ({
  ...props,
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))`
  margin: 5%;
`;

export const Tabs = styled.TouchableOpacity`
  margin-right: 10px;
  height: 40px;
  width: 120px;
  border-radius: 20px;

  align-items: center;
  justify-content: center;

  background-color: #C20909;
`;

export const Text = styled.Text`
  color: #fff;
`;
