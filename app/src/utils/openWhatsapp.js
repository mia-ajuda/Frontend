import { Linking } from 'react-native';

export default function openWhatsapp(phoneNumber) {
    Linking.openURL(
        `whatsapp://send?phone=${phoneNumber}&text=${'Olá, precisa de ajuda?'}`,
    );
}
