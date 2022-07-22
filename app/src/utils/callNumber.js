import { Linking } from 'react-native';

export default function callNumber(phoneNumber) {
    Linking.openURL(`tel:${phoneNumber}`);
}
