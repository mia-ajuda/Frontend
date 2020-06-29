import { Alert } from 'react-native';

function alertError(error, message = null, type = null) {
    if (type == null) {
        type = 'Erro';
    }
    if (message == null) {
        try {
            message = error.response.data.error;
        } catch (err) {
            console.log(err);
            message = 'Algo deu errado, tente novamente mais tarde';
        }
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

function alertMessage(message) {
    Alert.alert(message);
}

export { alertSuccess, alertError, alertMessage };
