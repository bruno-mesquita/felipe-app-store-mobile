import { ComponentType } from 'react';
import { TouchableOpacityProps, ViewProps, TextProps, Text } from 'react-native';
import styled, { css } from 'styled-components/native';

import { CardBase } from '../../../Components/_Bases';

type TabProps = TouchableOpacityProps & ViewProps & {
  selected: boolean;
  first: boolean;
}

type TabTextProps = TextProps & {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const TabContainer = styled.ScrollView.attrs(props => ({
  ...props,
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))`
  margin: 5% 0 5% 0;
`;

export const Tab = styled(CardBase as ComponentType<TabProps>)`${({ selected, first }) => css`
  margin-right: 10px;
  height: 40px;
  width: 120px;
  border-radius: 20px;

  align-items: center;
  justify-content: center;

  background-color: ${selected ? '#c20909' : '#fff'};

  ${first && css`
    margin-left: 15px;
  `}
`}
`;

export const TabText = styled(Text as any)`
  color: ${({ selected }) => selected ? '#fff' : '#000'};
`;
