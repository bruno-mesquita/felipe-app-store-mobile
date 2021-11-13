import { MutableRefObject } from 'react';
import { TextInputMasked } from 'react-native-masked-text';
import { FormikProps } from 'formik';

interface Values {
  id?: number | undefined;
  name: string;
  cellphone: string;
  openingTime: string;
  closingTime: string;
  freightValue: string;
  categories: number[];
  image: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    state: string;
    city: string;
    cep: string;
  };
  coordinates?: {
    longitude: string;
    latitude: string;
  }
}

export type EstablishmentFormProps = FormikProps<Values> & {
  inputPhoneRef: MutableRefObject<TextInputMasked>
  inputCepRef: MutableRefObject<TextInputMasked>
  inputPriceRef: MutableRefObject<TextInputMasked>
}
