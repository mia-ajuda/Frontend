import firebaseService from './Firebase';
import { AsyncStorage } from 'react-native';
import translateFirebaseError from '../utils/translateFirebaseAuthError';
import UserService from './User';
import EntityService from './Entity';

import env from '../config/envVariables';
import api from './Api';

class SessionService {
    constructor() {}
    async signIn(loginInfo) {
        try {
            await firebaseService.login(loginInfo.email, loginInfo.password);

            const isEmailVerified = firebaseService.isEmailVerified();
            const shouldVerifyEmail = env.production || env.staging;

            if (isEmailVerified == false && shouldVerifyEmail) {
                throw { code: 'auth/email-not-verified' };
            }
            const doesEmailExist = await UserService.verifyUserInfo(
                loginInfo.email,
            );
            if (doesEmailExist) UserService.setUserDeviceId();
            else EntityService.setEntityDeviceId();
        } catch (error) {
            const errorFromFirebase = error.code;
            if (errorFromFirebase) {
                const translatedMessage =
                    translateFirebaseError[errorFromFirebase];
                throw {
                    message: translatedMessage,
                    code: errorFromFirebase,
                };
            }
            throw error;
        }
    }

    async signUp(data) {
        try {
            let response;
            if (data.cnpj) response = await api.post('/entity', data);
            else response = await api.post('/user', data);

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
