import { Alert } from 'react-native';

function alertError(error) {
    const type = 'Erro';
    console.log(error);
    if (error.message === 'Network Error') {
        Alert.alert(type, 'Falha de conexão', [{ title: 'OK' }]);
    } else {
        try {
            const message = error.response.data.error;
            Alert.alert(type, message, [{ title: 'OK' }]);
        } catch (error) {
            console.log(error);
        }
    }
}

function alertSuccess(message) {
    Alert.alert('Sucesso', message, [{ title: 'OK' }]);
}

export { alertSuccess, alertError };
