import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.Text`
  color: #000;
  font-size: ${({ theme }) => theme.metrics.px(23)}px;
`;

export const Photo = styled.Image.attrs((props) => ({
  ...props,
  resizeMode: 'cover',
}))`
  ${({ theme: { metrics } }) => css`
    width: ${metrics.px(125)}px;
    height: ${metrics.px(125)}px;
    border-radius: ${metrics.px(18)}px;
  `}
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  width: 85%;
`;
