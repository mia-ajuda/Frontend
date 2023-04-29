import cnpjValidator from '../../../utils/cnpjValidator';
import cpfValidator from '../../../utils/cpfValidator';
import parseDate from '../../../utils/parseDate';
import * as Yup from 'yup';

export const initialValues = (user) => ({
    name: user?.name || '',
    birthday: parseDate(user?.birthday) || '',
    phone: user?.phone?.slice(3, 14) || '',
    id: user?.cpf || user?.cnpj || '',
});

export const schema = (id_type) =>
    Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('Nome é obrigatório')
            .test('nome', 'Insira nome e sobrenome', (value) => {
                if (!value) {
                    return false;
                }
                const name = value
                    .split(' ')
                    .filter((nonSpaces) => nonSpaces !== '');
                if (name.length >= 2) {
                    return true;
                }
            }),
        birthday: Yup.date()
            .required('Data de nascimento é obrigatório')
            .typeError('Data no formato errado, utilize o formato 30/09/2009')
            .min(1900, 'Data inválida'),
        phone: Yup.string()
            .required('Telefone é obrigatório')
            .matches(
                /^\D*(\d{2})\D*\D*(\d{5}|\d{4})\D*(\d{4})$/,
                'Digite um telefone válido',
            ),
        id: Yup.string()
            .required(`${id_type} é obrigatório`)
            .test('id', `${id_type} inválido`, (value) => {
                if (id_type === 'CPF') return cpfValidator(value);
                return cnpjValidator(value);
            }),
    });
