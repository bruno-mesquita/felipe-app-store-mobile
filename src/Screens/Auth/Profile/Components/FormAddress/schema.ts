import { object, string, SchemaOf, number } from 'yup';

import { Values } from './props';

const schema: SchemaOf<Values> = object({
  id: number().required(),
  street: string().required(),
  number: string().required(),
  neighborhood: string().required(),
  cep: string().required(),
  city: number().required(),
  state: number().required(),
})

export default schema;
