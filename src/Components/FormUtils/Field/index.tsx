import { Container, ContainerTextField, Label, TextField } from './styles';
import { FieldProps } from './props';

export const Field = ({ label, labelColor, ...rest }: FieldProps) => (
  <Container>
    <Label style={labelColor ? { color: labelColor } : {}}>{label}</Label>
    <ContainerTextField>
      <TextField {...rest} />
    </ContainerTextField>
  </Container>
);
