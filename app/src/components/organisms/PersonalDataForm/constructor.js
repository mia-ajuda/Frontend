import cnpjValidator from '../../../utils/cnpjValidator';
import cpfValidator from '../../../utils/cpfValidator';
import parseDate from '../../../utils/parseDate';
import * as Yup from 'yup';

export const initialValues = (user) => ({
    name: user?.name || '',
    birthday: parseDate(user?.birthday) || '',
    phone: user?.phone || '',
    id: user?.cpf || user?.cnpj || '',
});

export const schema = (id_type) =>
    Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('Nome é obrigatório')
            .matches(
                /^([a-zA-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/,
                'Este nome é inválido',
            )
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
            .min(1900, 'Data inválida'),
        phone: Yup.string()
            .required('Telefone é obrigatório')
            .matches(
                /^(\([1-9]{2}\) )?([9]{1})?([1-9]{1})?([0-9]{3})-?([0-9]{4})$/,
                'Digite um telefone válido',
            ),
        id: Yup.string()
            .required(`${id_type} é obrigatório`)
            .test('id', `${id_type} inválido`, (value) => {
                if (id_type === 'CPF') return cpfValidator(value);
                return cnpjValidator(value);
            }),
    });
