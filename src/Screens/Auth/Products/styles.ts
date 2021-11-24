import { TouchableOpacityProps, ViewProps, TextProps } from 'react-native';
import styled, { css } from 'styled-components/native';

import { CardBase } from '../../../Components/_Bases';

type TabProps = TouchableOpacityProps &
  ViewProps & {
    selected: boolean;
    first: boolean;
  };

type TabTextProps = TextProps & {
  selected: boolean;
};

export const Container = styled.View`
  flex: 1;
`;

export const TabContainer = styled.ScrollView.attrs((props) => ({
  ...props,
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))`
  margin-top: 5%;
`;

export const Tab = styled(CardBase)<TabProps>`
  ${({ selected, first, theme }) => css`
    margin-right: 10px;
    height: ${theme.metrics.px(50)}px;
    padding: ${`0px ${theme.metrics.px(30)}px`};
    border-radius: 20px;

    align-items: center;
    justify-content: center;

    background-color: ${selected ? '#c20909' : '#fff'};

    ${first &&
    css`
      margin-left: 15px;
    `}
  `}
`;

export const TabText = styled.Text<TabTextProps>`
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: ${({ theme }) => theme.metrics.px(25)}px;
`;
