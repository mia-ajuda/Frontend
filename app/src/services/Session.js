import firebaseService from './Firebase';
import { AsyncStorage } from 'react-native';
import UserService from './User';
import EntityService from './Entity';

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
        const loggedUser = await firebaseService.getCurrentUser();

        const userName = loggedUser.displayName.split('|');
        const userType = userName.length === 1 ? 'PF' : userName[1].trim();

        if (userType == 'PJ') EntityService.setEntityDeviceId();
        else UserService.setUserDeviceId();
    }
    async signUp(data) {
        const isEntityUser = data.cnpj;
        const response = isEntityUser
            ? await api.post('/entity', data)
            : await api.post('/user', data);

        await firebaseService.login(data.email, data.password);
        await firebaseService.sendEmailVerification();
        return response;
    }

    async signOut() {
        await AsyncStorage.removeItem('accessToken');
        await firebaseService.signOut();
        return true;
    }
}
export default new SessionService();
