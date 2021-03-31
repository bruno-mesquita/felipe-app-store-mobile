import React from 'react';
import { NativeBase } from 'native-base';

import {
  Container,
  ContainerTextField,
  Label,
  PasswordIcon,
  TextField,
} from './styles';

interface FieldProps extends NativeBase.Input {
  textValue: string;
  textColor?: string;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
}

const Field = (props: FieldProps) => {
  return (
    <Container>
      <Label style={{ color: props.textColor || '#FFFFFF' }}>
        {props.textValue}
      </Label>
      <ContainerTextField>
        <TextField {...props} />
        <PasswordIcon
          name={props.iconName}
          size={props.iconSize}
          color={props.iconColor}
        />
      </ContainerTextField>
    </Container>
  );
};

export { Field };
