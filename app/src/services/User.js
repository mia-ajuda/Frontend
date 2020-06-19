import api from '../services/Api';
import firebaseAuth from './firebaseAuth';
import { Notifications } from 'expo';
import { AsyncStorage, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import authConfig from '../config/authmiaajuda-firebase';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import translateFirebaseError from '../utils/translateFirebaseAuthError';

const setUserDeviceId = async () => {
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
};

class UserService {
    constructor() {}

    async logIn(data) {
        try {
            await firebaseAuth
                .auth()
                .signInWithEmailAndPassword(data.email, data.password);

            const idTokenUser = await firebaseAuth
                .auth()
                .currentUser.getIdToken();
            await AsyncStorage.setItem('accessToken', idTokenUser);
            const user = await this.requestUserData();
            setUserDeviceId();

            return user;
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
                await firebase
                    .auth()
                    .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const credential = await firebase.auth.FacebookAuthProvider.credential(
                    token,
                );
                const facebookProfileData = await firebase
                    .auth()
                    .signInWithCredential(credential); // Sign in with Facebook credential

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
                    const idTokenUser = await firebase
                        .auth()
                        .currentUser.getIdToken();
                    await AsyncStorage.setItem('accessToken', idTokenUser);
                    const user = await this.requestUserData();

                    setUserDeviceId();
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
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    idToken,
                    accessToken,
                );

                await firebase.auth().signInWithCredential(credential);

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
                    const idTokenUser = await firebase
                        .auth()
                        .currentUser.getIdToken();
                    await AsyncStorage.setItem('accessToken', idTokenUser);

                    const user = await this.requestUserData();

                    setUserDeviceId();

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
        const { hasUser } = data;

        if (hasUser) {
            data.password = '12345678';
        }

        try {
            const response = await api.post(`/user?hasUser=${hasUser}`, data);
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
            await firebase.auth().signOut();
        } catch {
            throw { error: 'Não foi possível Deslogar!' };
        }
    }

    isSignIn() {
        return this._token !== undefined;
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
}

const userService = new UserService();
Object.freeze(userService);

export default userService;
