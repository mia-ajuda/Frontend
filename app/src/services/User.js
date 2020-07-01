import api from '../services/Api';
import { Notifications } from 'expo';
import { AsyncStorage, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import authConfig from '../config/authmiaajuda-firebase';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import translateFirebaseError from '../utils/translateFirebaseAuthError';

import firebaseService from './Firebase';

class UserService {
    constructor() {}

    async logIn(data) {
        try {
            await firebaseService.login(data.email, data.password);
            const checkIfUserIsVerified = firebaseService.firebase.auth()
                .currentUser.emailVerified;
            if (checkIfUserIsVerified) {
                const idTokenUser = await firebaseService.getUserId(); // Chaves de acesso
                await AsyncStorage.setItem('accessToken', idTokenUser); // Permitir rotas
                const user = await this.requestUserData();
                this.setUserDeviceId();
                return user;
            } else {
                await this.logOut();
                throw {
                    message: 'Seu e-mail não foi verificado',
                };
            }
        } catch (error) {
            const translatedMessage = translateFirebaseError[error.code];
            throw {
                message:
                    translatedMessage ||
                    error.response.data.error ||
                    'Algo deu errado, tente novamente mais tarde',
            };
        }
    }

    async logInWithFacebook(navigation) {
        try {
            await Facebook.initializeAsync(authConfig.facebookId);
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });

            if (type === 'success') {
                await firebaseService.setPersistence();
                const credential = await firebaseService.getCredentialFacebook(
                    token,
                );
                const facebookProfileData = await firebaseService.signInWithCredential(
                    credential,
                );

                const userFacebookInfo = facebookProfileData.additionalUserInfo;

                const isExists = await api.get(
                    `/checkUserExistence/${userFacebookInfo.profile.email}`,
                );

                if (!isExists.data) {
                    Alert.alert(
                        'Cadatrar',
                        'Para prosseguir precisamos de mais algumas informações. Deseja continuar seu cadastro?',
                        [
                            {
                                text: 'OK',
                                onPress: () =>
                                    navigation.navigate('location', {
                                        userData: {
                                            email:
                                                userFacebookInfo.profile.email,
                                            name: userFacebookInfo.profile.name,
                                            photo:
                                                userFacebookInfo.profile.picture
                                                    .data.url,
                                            birthday:
                                                userFacebookInfo.profile
                                                    .birthday,
                                            hasUser: true,
                                        },
                                    }),
                            },
                            {
                                text: 'Cancelar',
                                onPress: () => {},
                            },
                        ],
                        {
                            cancelable: false,
                        },
                    );
                    return {};
                } else {
                    const idTokenUser = await firebaseService.getUserId();
                    await AsyncStorage.setItem('accessToken', idTokenUser);
                    const user = await this.requestUserData();

                    this.setUserDeviceId();
                    return user;
                }
            }
        } catch (err) {
            console.log(err);
            throw { error: 'Erro ao logar com o Facebook. Tente Novamente!' };
        }
    }

    async loginInWithGoogle(navigation) {
        try {
            const googleResponse = await Google.logInAsync({
                androidClientId: authConfig.googleAndroidClientId,
                iosClientId: authConfig.googleIosClientId,
                scopes: ['profile', 'email'],
            });

            if (googleResponse.type === 'success') {
                const { idToken, accessToken } = googleResponse;
                const credential = await firebaseService.getCredentialGoogle(
                    idToken,
                    accessToken,
                );

                await firebaseService.signInWithCredential(credential);

                const isExists = await api.get(
                    `/checkUserExistence/${googleResponse.user.email}`,
                );

                if (!isExists.data) {
                    Alert.alert(
                        'Cadatrar',
                        'Para prosseguir precisamos de mais algumas informações. Deseja continuar seu cadastro?',
                        [
                            {
                                text: 'OK',
                                onPress: () =>
                                    navigation.navigate('location', {
                                        userData: {
                                            email: googleResponse.user.email,
                                            name: googleResponse.user.name,
                                            photo: googleResponse.user.photoUrl,
                                            hasUser: true,
                                        },
                                    }),
                            },
                            {
                                text: 'Cancelar',
                                onPress: () => {},
                            },
                        ],
                        {
                            cancelable: false,
                        },
                    );
                } else {
                    const idTokenUser = await firebaseService.getUserId();

                    await AsyncStorage.setItem('accessToken', idTokenUser);

                    const user = await this.requestUserData();

                    this.setUserDeviceId();

                    return user;
                }
            } else {
                throw {
                    error:
                        'Não foi possível fazer login com o Google. Tente novamente!',
                };
            }
        } catch (e) {
            return {
                error:
                    'Não foi possível fazer login com o Google. Tente novamente!',
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
            console.log(error);
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
