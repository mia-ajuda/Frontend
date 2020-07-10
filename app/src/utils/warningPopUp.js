import { Alert, AsyncStorage } from 'react-native';

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
