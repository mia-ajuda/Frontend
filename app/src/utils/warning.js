import { Alert, AsyncStorage } from 'react-native';

async function warning(message, warningType) {
    const dontShowAgainPressed = await AsyncStorage.getItem(warningType);
    if (dontShowAgainPressed != 'true') {
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

export default warning;
