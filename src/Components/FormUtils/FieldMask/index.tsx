import React from 'react';

import { Container, ContainerTextField, Label, TextField } from './styles';
import { FieldProps } from './props';

export const FieldMask = ({
  label,
  maskRef,
  labelColor,
  ...rest
}: FieldProps) => (
  <Container>
    <Label style={labelColor ? { color: labelColor } : {}}>{label}</Label>
    <ContainerTextField>
      {maskRef ? (
        <TextField {...rest} ref={maskRef} />
      ) : (
        <TextField {...rest} />
      )}
    </ContainerTextField>
  </Container>
);
