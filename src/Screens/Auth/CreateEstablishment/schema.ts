import { object, string, number, array } from 'yup';

export const schema = object({
  name: string().required(),
  cellphone: string().required(),
  openingTime: number().integer().min(0).max(24).required(),
  closingTime: number().integer().min(0).max(24).required(),
  freightValue: string().required(),
  categories: array().of(number()).required().min(1, 'Selecione pelo menos 1 categoria'),
  image: string().required(),
  address: object({
    street: string().required(),
    number: string().required(),
    neighborhood: string().required(),
    state: string().required(),
    city: number().required(),
    cep: string().required(),
  }),
});
