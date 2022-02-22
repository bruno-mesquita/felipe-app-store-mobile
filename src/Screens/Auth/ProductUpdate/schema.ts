import { object, string, number } from 'yup';

const schema = object({
  id: number().integer().positive().required(),
  name: string().required(),
  description: string().required(),
  price: string().required(),
  image: string().required(),
  menu: number().integer().positive().integer().required(),
});

export default schema;
