import api from "../services/Api";
import firebaseAuth from "./firebaseAuth";
import { Notifications } from "expo";
import { AsyncStorage, Alert } from "react-native";
import * as Facebook from "expo-facebook";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import authConfig from "../config/authmiaajuda-firebase";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
const setUserDeviceId = async () => {
  try {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        throw "Failed to get push token for push notification!";
      }
    }

    Notifications.getExpoPushTokenAsync()
      .then(async (pushToken) => {
        await api.put(`/user`, { deviceId: pushToken });
      })
      .catch((error) => {
        console.log(error);
        console.log('Tente rodar "expo login"');
      });
  } catch {
    throw { error: "Não foi possível recuperar Push Token!" };
  }
};




class UserService {
  constructor() {}
  
  async logIn(data) {
    try {
      await firebaseAuth
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      const idTokenUser = await firebaseAuth.auth().currentUser.getIdToken();
      await AsyncStorage.setItem("accessToken", idTokenUser);
      const user = await this.requestUserData();
      setUserDeviceId();

      return user;
    } catch (error) {
      console.log(error.response.data);
      throw { error: error.response.data.error };
    }
  }

  async logInWithFacebook(navigation) {
    try {
      await Facebook.initializeAsync(authConfig.facebookId);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (type === "success") {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = await firebase.auth.FacebookAuthProvider.credential(
          token
        );
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credential); // Sign in with Facebook credential

        const userData = facebookProfileData.additionalUserInfo;

        const isExists = await api.get(
          `/checkUserExistence/${userData.profile.email}`
        );

        if (!isExists.data) {
          Alert.alert(
            "Cadatrar",
            "Para prosseguir precisamos de mais algumas informações. Deseja continuar seu cadastro?",
            [
              {
                text: "OK",
                onPress: () =>
                  navigation.navigate("personalData", {
                    registrationData: {
                      email: userData.profile.email,
                      name: userData.profile.name,
                      photo: userData.profile.picture.data.url,
                      birthday: userData.profile.birthday,
                      hasUser: true,
                    },
                  }),
              },
              {
                text: "Cancelar",
                onPress: () => {},
              },
            ],
            {
              cancelable: false,
            }
          );
          return {};
        } else {
          const idTokenUser = await firebase.auth().currentUser.getIdToken();
          await AsyncStorage.setItem("accessToken", idTokenUser);
          const user = await this.requestUserData();

          setUserDeviceId();
          return user;
        }
      }
    } catch (err) {
      console.log(err);
      throw { error: "Erro ao logar com o Facebook. Tente Novamente!" };
    }
  }

  async loginInWithGoogle(navigation) {
    try {
      const result = await Google.logInAsync({
        androidClientId: authConfig.googleAndroidClientId,
        iosClientId: authConfig.googleIosClientId,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        );

        await firebase.auth().signInWithCredential(credential);

        const isExists = await api.get(
          `/checkUserExistence/${result.user.email}`
        );

        if (!isExists.data) {
          Alert.alert(
            "Cadatrar",
            "Para prosseguir precisamos de mais algumas informações. Deseja continuar seu cadastro?",
            [
              {
                text: "OK",
                onPress: () =>
                  navigation.navigate("personalData", {
                    registrationData: {
                      email: result.user.email,
                      name: result.user.name,
                      photo: result.user.photoUrl,
                      hasUser: true,
                    },
                  }),
              },
              {
                text: "Cancelar",
                onPress: () => {},
              },
            ],
            {
              cancelable: false,
            }
          );
        } else {
          const idTokenUser = await firebase.auth().currentUser.getIdToken();
          await AsyncStorage.setItem("accessToken", idTokenUser);

          const user = await this.requestUserData();

          setUserDeviceId();

          return user;
        }
      } else {
        throw {
          error: "Não foi possível fazer login com o Google. Tente novamente!",
        };
      }
    } catch (e) {
      return {
        error: "Não foi possível fazer login com o Google. Tente novamente!",
      };
    }
  }

  async signUp(data) {
    const { hasUser } = data;

    if (hasUser) {
      data.password = "12345678";
    }

    try {
      const response = await api.post(`/user?hasUser=${hasUser}`, data);
      return response;
    } catch (error) {
      console.log(error);
      throw {
        error:
          "Aconteceu algo errado ao cadastrar, tente novamente mais tarde.",
      };
    }
  }

  async logOut() {
    try {
      await AsyncStorage.clear();
      await firebase.auth().signOut();
    } catch {
      throw { error: "Não foi possível Deslogar!" };
    }
  }

  isSignIn() {
    return this._token !== undefined;
  }

  async requestUserData() {
    try {
      const user = await api.get(`/user/getUser`);
      return user.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyUserInfo(value) {
    const response = await api.get(`/checkUserExistence/${value}`);
    return !!response.data;
  }

  async editUser(data, complement = "") {
    try {
      const user = await api.put(`/user${complement}`, data);
      return user.data;
    } catch(err) {
      throw err;
    }
  }
}

const userService = new UserService();
Object.freeze(userService);

export default userService;
