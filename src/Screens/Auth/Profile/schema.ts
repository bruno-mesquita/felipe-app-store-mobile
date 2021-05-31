import { object, string, SchemaOf } from 'yup';

import { Values } from './props';

const REQUIRED = 'Campo obrigatorio';

const schema: SchemaOf<Values> = object({
  first_name: string().required(REQUIRED),
  last_name: string().required(REQUIRED),
  email: string().email('Coloque um email valido').required(REQUIRED),
  cellphone: string().required(REQUIRED),
})

export default schema;
