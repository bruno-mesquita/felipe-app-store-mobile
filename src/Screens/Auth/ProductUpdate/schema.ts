import { object, string, number } from 'yup';

const REQUIRED = 'Campo  obrigatório';

const schema = object({
  id: string().required(REQUIRED),
  name: string().required(REQUIRED),
  description: string().required(REQUIRED),
  price: string().required(REQUIRED),
  image: string().required(REQUIRED).nullable(),
  menu: number().min(1).positive(REQUIRED).integer(REQUIRED).required(REQUIRED),
})

export default schema;
