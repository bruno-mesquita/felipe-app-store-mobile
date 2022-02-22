import { object, string, number } from 'yup';

const REQUIRED = 'Campo  obrigatório';

const schema = object({
  id: number().integer().positive().required(REQUIRED),
  name: string().required(REQUIRED),
  description: string().required(REQUIRED),
  price: string().required(REQUIRED),
  image: string().required(REQUIRED),
  menu: number().integer().positive(REQUIRED).integer(REQUIRED).required(REQUIRED),
});

export default schema;
