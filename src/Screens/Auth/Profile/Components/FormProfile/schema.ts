import { object, string, number } from 'yup';

const schema = object({
  id: number().required(),
  name: string().required(),
  email: string().required(),
  cellphone: string().required(),
  openingTime: string().required(),
  closingTime: string().required(),
  freightValue: string().required(),
})

export default schema;
