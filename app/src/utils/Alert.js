import { Alert } from 'react-native';
import translateFirebaseError from '../utils/translateFirebaseAuthError';
import firebaseService from '../services/Firebase';

function alertError(error, message = null) {
    let type = 'Ooops..';
    if (error) {
        if (error.message === 'Network Error') {
            message = 'Falha de conexão';
        } else if (error.code) {
            message = translateFirebaseError[error.code];
        }
        if (message == null) {
            try {
                message =
                    error.response.data.error ||
                    error.message ||
                    'Algo deu errado, tente novamente mais tarde';
            } catch (err) {
                message =
                    error.message ||
                    'Algo deu errado, tente novamente mais tarde';
            }
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
function alertMessageEmailVerification(message) {
    Alert.alert('Email não verificado', message, [
        {
            text: 'Reenviar email',
            onPress: async () => {
                await firebaseService.sendEmailVerification();
                alertSuccess(
                    'Email enviado com sucesso! Verifique sua caixa de entrada e também sua caixa de spam.',
                );
            },
            style: 'cancel',
        },
        { text: 'OK', onPress: () => { } },
    ]);
}

export {
    alertSuccess,
    alertError,
    alertMessage,
    alertMessageEmailVerification,
};
