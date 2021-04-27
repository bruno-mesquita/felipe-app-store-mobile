import { FormikProps } from 'formik';

export interface Values {
  id?: number | undefined;
  name: string;
  price: string;
  description: string;
  menu: number;
  image: string;
}

export interface ProductFormProps extends FormikProps<Values> {
  inputPriceRef: any;
}
