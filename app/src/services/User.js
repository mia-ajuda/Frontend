import api from '../services/Api';
import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import firebaseService from './Firebase';

class UserService {
    constructor() {}

    async logIn(data) {
        try {
            await firebaseService.login(data.email, data.password);

            // const idTokenUser = await firebaseService.getUserId(); // Chaves de acesso
            await AsyncStorage.setItem('accessToken', 'dssdk'); // Permitir rotas
            const user = await this.requestUserData();
            this.setUserDeviceId();
            return user;
        } catch (error) {
            console.log(error.response);
            const translatedMessage = 'dskdhskh';

            throw {
                message:
                    translatedMessage ||
                    error ||
                    'Algo deu errado, tente novamente mais tarde',
            };
        }
    }

    async signUp(data) {
        try {
            const response = await api.post('/user', data);
            await firebaseService.login(data.email, data.password);
            await firebaseService.sendEmailVerification();
            await this.logOut();
            return response;
        } catch (error) {
            console.log(error.response);
            throw {
                error:
                    'Aconteceu algo errado ao cadastrar, tente novamente mais tarde.',
            };
        }
    }

    async logOut() {
        try {
            await AsyncStorage.clear();
            await firebaseService.signOut();
        } catch {
            throw { error: 'Não foi possível Deslogar!' };
        }
    }

    async requestUserData() {
        try {
            const user = await api.get('/user/getUser');
            return user.data;
        } catch (error) {
            console.log('requestUserData error');
            throw error;
        }
    }

    async verifyUserInfo(value) {
        const response = await api.get(`/checkUserExistence/${value}`);
        return !!response.data;
    }

    async editUser(data, complement = '') {
        const user = await api.put(`/user${complement}`, data);
        return user.data;
    }

    async setUserDeviceId() {
        try {
            if (Constants.isDevice) {
                const { status: existingStatus } = await Permissions.getAsync(
                    Permissions.NOTIFICATIONS,
                );
                let finalStatus = existingStatus;

                if (existingStatus !== 'granted') {
                    const { status } = await Permissions.askAsync(
                        Permissions.NOTIFICATIONS,
                    );
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    throw 'Failed to get push token for push notification!';
                }
            }

            Notifications.getExpoPushTokenAsync()
                .then(async (pushToken) => {
                    await api.put('/user', { deviceId: pushToken });
                })
                .catch((error) => {
                    console.log(error);
                    console.log('Tente rodar "expo login"');
                });
        } catch {
            throw { error: 'Não foi possível recuperar Push Token!' };
        }
    }
}

const userService = new UserService();
Object.freeze(userService);

export default userService;
