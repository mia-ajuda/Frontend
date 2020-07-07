import { Alert } from 'react-native';
import translateFirebaseError from '../utils/translateFirebaseAuthError';

function alertError(error, message = null) {
    let type = 'Ooops..';
    if (error) {
        if (error.message === 'Network Error') {
            message = 'Falha de conexão';
        } else if (error.code) {
            message = translateFirebaseError[error.code];
        } else if (message == null) {
            try {
                message = error.response.data.error;
            } catch (err) {
                console.log(err);
                message = 'Algo deu errado, tente novamente mais tarde';
            }
        }
    }
    console.log(error);
    console.log(message);
    Alert.alert(type, message);
}

function alertSuccess(message) {
    Alert.alert('Sucesso', message);
}

function alertMessage(message) {
    Alert.alert(null, message);
}

export { alertSuccess, alertError, alertMessage };
