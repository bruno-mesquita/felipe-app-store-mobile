import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Campo obrigátorio',
  },
  string: {
    email: 'Email inválido',
  },
});
