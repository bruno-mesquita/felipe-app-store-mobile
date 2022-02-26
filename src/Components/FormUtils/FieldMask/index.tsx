import { TextField } from './styles';
import { FieldProps } from './props';

export const FieldMask = ({ maskRef, ...rest }: FieldProps) => (
  <TextField {...rest} ref={maskRef} />
);
