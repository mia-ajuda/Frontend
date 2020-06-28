import { Alert } from 'react-native';

function alertError(error, message = null, type = null) {
    if (type == null) {
        type = 'Erro';
    }
    if (message == null) {
        message = error.response.data.error;
    }
    console.log(error);
    if (error.message === 'Network Error') {
        Alert.alert(type, 'Falha de conexão', [{ title: 'OK' }]);
    } else {
        Alert.alert(type, message, [{ title: 'OK' }]);
    }
}

function alertSuccess(message) {
    Alert.alert('Sucesso', message, [{ title: 'OK' }]);
}

export { alertSuccess, alertError };
