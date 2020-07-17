import api from '../services/Api';
import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
// import translateFirebaseError from '../utils/translateFirebaseAuthError';

import firebaseService from './Firebase';

class UserService {
    constructor() {}

    async logIn(loginInfo) {
        await firebaseService.login(loginInfo.email, loginInfo.password);
        const isEmailVerified = firebaseService.isEmailVerified();
        if (isEmailVerified == false) {
            throw { code: 'auth/email-not-verified' };
        }
        const idTokenUser = await firebaseService.getUserId();
        await AsyncStorage.setItem('accessToken', idTokenUser);
        const user = await this.requestUserData();
        this.setUserDeviceId();
        return user;
    }

    async signUp(data) {
        const response = await api.post('/user', data);
        await firebaseService.login(data.email, data.password);
        await firebaseService.sendEmailVerification();
        await firebaseService.signOut();
        return response;
    }

    async logOut() {
        await AsyncStorage.removeItem('accessToken');
        await firebaseService.signOut();
        return true;
    }

    async requestUserData() {
        const user = await api.get('/user/getUser');
        return user.data;
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
