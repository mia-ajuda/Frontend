import { Linking } from 'react-native';
import { alertMessage } from './Alert';

export default function openWhatsapp(
    phoneNumber,
    message = 'Olá, precisa de ajuda?',
) {
    Linking.openURL(
        `whatsapp://send?phone=${phoneNumber}&text=${message}`,
    ).catch(() => alertMessage('Não foi possível abrir o Whatsapp.'));
}
