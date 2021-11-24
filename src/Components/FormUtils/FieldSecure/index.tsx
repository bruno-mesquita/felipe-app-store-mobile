import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Container, ContainerTextField, Label, TextField } from './styles';
import { FieldProps } from './props';

export const FieldSecure = ({ label, labelColor, ...rest }: FieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <Label style={labelColor ? { color: labelColor } : {}}>{label}</Label>
      <ContainerTextField>
        <TextField {...rest} secureTextEntry={!visible} />
        <TouchableOpacity onPress={() => setVisible((old) => !old)}>
          {visible ? (
            <Ionicons name="eye-off" size={30} color="#fff" />
          ) : (
            <Ionicons name="eye" size={30} color="#fff" />
          )}
        </TouchableOpacity>
      </ContainerTextField>
    </Container>
  );
};
