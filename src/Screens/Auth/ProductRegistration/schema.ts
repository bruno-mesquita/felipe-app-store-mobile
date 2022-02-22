import { object, string, number, SchemaOf, boolean, mixed } from 'yup';

const REQUIRED = 'Campo  obrigatório';

import type { IValues } from './types';

const schema: SchemaOf<IValues> = object({
  name: string().required(REQUIRED),
  description: string().required(REQUIRED),
  price: number().required(REQUIRED),
  image: string().required(REQUIRED),
  menu: string().required(),
  active: boolean(),
  unit: number().positive().required(),
  unitType: mixed().oneOf(['Un', 'Kg', 'gr']),
});

export default schema;
