import { object, string, number, SchemaOf, boolean, mixed } from 'yup';

import type { IValues } from './types';

const schema: SchemaOf<IValues> = object({
  name: string().required(),
  description: string().required(),
  price: number().required(),
  image: string().required(),
  menu: string().required(),
  active: boolean(),
  unit: number().positive().required(),
  unitType: mixed().oneOf(['Un', 'Kg', 'gr']),
});

export default schema;
