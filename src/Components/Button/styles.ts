import { ComponentType } from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';
import styled, { css } from 'styled-components/native';

import { Props } from './index';

export const Container = styled.View``;

export const ButtonConfig = styled<ComponentType<Props>>(Button as any)`
  ${({ theme, primaryColor }) => css`
    border-radius: 10px;
    width: 221px;
    height: 45px;
    align-self: center;
    margin-bottom: 14px;
    justify-content: center;
    align-items: center;
    background: ${primaryColor ? theme.colors.primary : theme.colors.secundary};
  `}
`;

export const TextConfig = styled<ComponentType<Props>>(Text as any)`
  ${({ theme, primaryColor }) => css`
    font-size: 20px;
    color: ${!primaryColor ? theme.colors.primary : theme.colors.secundary};
  `}
`;
