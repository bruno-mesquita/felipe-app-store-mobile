import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image.attrs((props) => ({
  ...props,
  resizeMode: 'cover',
}))`
  height: 120px;
  width: 120px;
  border-radius: 100px;
`;

export const ButtonModal = styled.TouchableOpacity`
  margin: 4px;
  width: 100%;
  border-radius: 10px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #000;
  margin-bottom: 5px;
`;

export const ContentButton = styled.View`
  height: 43px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;
  background-color: #770202;

  padding-left: 10px;
`;
