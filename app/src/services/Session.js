import firebaseService from './Firebase';
import { AsyncStorage } from 'react-native';
import UserService from './User';

import env from '../config/envVariables';
import api from './Api';

class SessionService {
    constructor() {}
    async signIn(loginInfo) {
        await firebaseService.login(loginInfo.email, loginInfo.password);

        const isEmailVerified = firebaseService.isEmailVerified();
        const shouldVerifyEmail = env.production || env.staging;

        if (isEmailVerified == false && shouldVerifyEmail) {
            throw { code: 'auth/email-not-verified' };
        }
        await UserService.setUserDeviceId();
    }
    async signUp(data) {
        try {
            const response = await api.post('/user', data);
            await firebaseService.login(data.email, data.password);
            await firebaseService.sendEmailVerification();
            await firebaseService.signOut();
            return response;
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    }

    async signOut() {
        try {
            await AsyncStorage.removeItem('accessToken');
            await firebaseService.signOut();
        } catch {
            throw { error: 'Não foi possível Deslogar!' };
        }
    }
}
export default new SessionService();
