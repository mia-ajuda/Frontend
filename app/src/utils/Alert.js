import { Alert } from 'react-native';
import firebaseService from '../services/Firebase';

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
        { text: 'OK', onPress: () => {} },
    ]);
}

export {
    alertSuccess,
    alertError,
    alertMessage,
    alertMessageEmailVerification,
};
