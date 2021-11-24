import { object, string, number, array } from 'yup';

const REQUIRED = 'Campo obrigátorio';

export const schema = object({
  name: string().required(REQUIRED),
  cellphone: string().required(REQUIRED),
  openingTime: number().integer().min(0).max(24).required(REQUIRED),
  closingTime: number().integer().min(0).max(24).required(REQUIRED),
  freightValue: string().required(REQUIRED),
  categories: array()
    .of(number())
    .required(REQUIRED)
    .min(1, 'Selecione pelo menos 1 categoria'),
  image: string().required(REQUIRED),
  address: object({
    street: string().required(REQUIRED),
    number: string().required(REQUIRED),
    neighborhood: string().required(REQUIRED),
    state: string().required(REQUIRED),
    city: number().required(REQUIRED),
    cep: string().required(REQUIRED),
  }),
});
