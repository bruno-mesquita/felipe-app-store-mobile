import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo obrigatorio'),
  password: Yup.string().required('Campo obrigatorio'),
});

export default schema;
