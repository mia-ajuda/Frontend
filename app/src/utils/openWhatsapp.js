import { Linking } from 'react-native';

export default function openWhatsapp(
    phoneNumber,
    message = 'Olá, precisa de ajuda?',
) {
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${message}`);
}
