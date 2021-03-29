import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

async function showWarning(warningType, message) {
    const dontShowAgainPressed = await AsyncStorage.getItem(warningType);
    if (dontShowAgainPressed) return;

    Alert.alert('Importante', message, [
        {
            text: 'Não mostrar novamente',
            onPress: async () =>
                await AsyncStorage.setItem(warningType, 'true'),
        },
        {
            text: 'Ok',
            onPress: () => {},
        },
    ]);
}

export default showWarning;
