import { object, string, SchemaOf } from 'yup';

import { Values } from './props';

const schema: SchemaOf<Values> = object({
  first_name: string().required(),
  last_name: string().required(),
  email: string().email('Coloque um email valido').required(),
  cellphone: string().required(),
});

export default schema;
