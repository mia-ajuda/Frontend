import { Alert, AsyncStorage } from 'react-native';

async function showWarningFor(warningType, message) {
    const dontShowAgainPressed = await AsyncStorage.getItem(warningType);
    if (dontShowAgainPressed) {
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
}

export { showWarningFor };
