import { Alert } from 'react-native';

function alertError(error, message = null, type = null) {
    if (type == null) {
        type = 'Erro';
    }

    if (error.message === 'Network Error') {
        type = 'Erro';
        message = 'Falha de conexão';
    } else if (message == null) {
        try {
            message = error.response.data.error;
        } catch (err) {
            console.log(err);
            message = 'Algo deu errado, tente novamente mais tarde';
        }
    }

    Alert.alert(type, message);
}

function alertSuccess(message) {
    Alert.alert('Sucesso', message);
}

function alertMessage(message) {
    Alert.alert(null, message);
}

export { alertSuccess, alertError, alertMessage };
