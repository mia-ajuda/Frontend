import firebaseService from './Firebase';
import { AsyncStorage } from 'react-native';
import translateFirebaseError from '../utils/translateFirebaseAuthError';
import UserService from './User';
import api from './Api';

class SessionService {
    constructor() {}

    async signIn(data) {
        try {
            await firebaseService.login(data.email, data.password);

            const idTokenUser = await firebaseService.getUserToken();
            await AsyncStorage.setItem('accessToken', idTokenUser);
            const user = await UserService.requestUserData();
            await UserService.setUserDeviceId();

            return user;
        } catch (error) {
            const errorFromFirebase = error.code;
            if (errorFromFirebase) {
                const translatedMessage =
                    translateFirebaseError[errorFromFirebase];
                throw {
                    message: translatedMessage,
                };
            }
            throw error;
        }
    }

    async signUp(data) {
        try {
            const response = await api.post('/user', data);
            return response;
        } catch (error) {
            console.log(error.response);
            throw {
                error:
                    'Aconteceu algo errado ao cadastrar, tente novamente mais tarde.',
            };
        }
    }

    async signOut() {
        try {
            await AsyncStorage.clear();
            await firebaseService.signOut();
        } catch {
            throw { error: 'Não foi possível Deslogar!' };
        }
    }
}
export default new SessionService();
