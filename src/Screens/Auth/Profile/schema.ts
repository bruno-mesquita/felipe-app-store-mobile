import { object, string, number, SchemaOf } from 'yup';

import { Values } from './props';

const schema: SchemaOf<Values> = object({
  name: string().required(),
  email: string().required(),
  cellphone: string().required(),
  openingTime: number().required(),
  closingTime: number().required(),
  freightValue: number().required(),
})

export default schema;
