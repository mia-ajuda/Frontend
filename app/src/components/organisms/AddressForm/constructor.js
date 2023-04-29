import * as Yup from 'yup';

export const initialValues = (address) => ({
    cep: address?.cep || '',
    city: address?.city || '',
    complement: address?.complement || '',
    state: address?.state || '',
    number: address?.number.toString() || '',
});

export const schema = Yup.object().shape({
    cep: Yup.string()
        .required('Nome é obrigatório')
        .length(8, 'CEP deve possuir 8 caracteres'),
    city: Yup.string().required('Cidade é obrigatória'),
    complement: Yup.string(),
    state: Yup.string()
        .required('Estado é obrigatório')
        .length(2, 'Utilize apenas a sigla do estado'),
    number: Yup.string().required('Número é obrigatório'),
});
