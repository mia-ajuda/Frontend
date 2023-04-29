import cnpjValidator from '../../../utils/cnpjValidator';
import cpfValidator from '../../../utils/cpfValidator';
import parseDate from '../../../utils/parseDate';
import * as Yup from 'yup';

export const initialValues = (user) => ({
    name: user?.name || '',
    birthday: parseDate(user?.birthday) || '',
    phone: user?.phone?.slice(3, 14) || '',
    id: user?.cpf || user?.cnpj || '',
    biography: user?.biography || '',
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
        birthday: Yup.string()
            .required('Data de nascimento é obrigatória')
            .matches(
                /^(0?\d|[12]\d|3[01])\/(0?\d|1[012])\/\d{4}$/,
                'Data deve estar no formato dd/MM/yyyy',
            )
            .test('valid-date', 'Data deve ser no passado', (value) => {
                if (!value) return false;
                const [day, month, year] = value.split('/');
                const date = new Date(year, month - 1, day);
                const now = new Date();
                return date < now;
            }),
        phone: Yup.string()
            .required('Telefone é obrigatório')
            .matches(
                /^(?:\(\d{2}\)\s\d{4,5}-\d{4}|\d{10,11})$/,
                'Digite um telefone válido',
            ),
        id: Yup.string()
            .required(`${id_type} é obrigatório`)
            .test('id', `${id_type} inválido`, (value) => {
                if (id_type === 'CPF') return cpfValidator(value);
                return cnpjValidator(value);
            }),
        biography: Yup.string(),
    });
