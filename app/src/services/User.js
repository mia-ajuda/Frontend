import api from "../services/Api";
import firebaseAuth from "./firebaseAuth";
import { AsyncStorage, Alert } from "react-native";
import * as Facebook from "expo-facebook";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";
import authConfig from "../config/authmiaajuda-firebase";

class UserService {
  constructor() {}

  async logIn(data) {
    try {
      await firebaseAuth
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      const idTokenUser = await firebaseAuth.auth().currentUser.getIdToken();
      const userInfo = await this.requestUserData(idTokenUser);

      const user = JSON.stringify({
        data: userInfo,
        accessToken: idTokenUser
      });

      await AsyncStorage.setItem("user", user);

      return {
        data: userInfo,
        idTokenUser,
        success: "Login feito sucesso!"
      };
    } catch (error) {
      throw { error: error.response.data.error };
    }
  }

  async logInWithFacebook(navigation) {
    try {
      await Facebook.initializeAsync(authConfig.facebookId);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
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

        const idTokenUser = await firebase.auth().currentUser.getIdToken();

        const isExists = await api.get(
          `/checkUserExistence/${userData.profile.email}`
        );

        if (!isExists.data) {
          Alert.alert(
            "Cadatrar",
            "Não existe uma conta criada com esse email. Deseja cadastra?",
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
                      hasUser: true
                    }
                  })
              },
              {
                text: "Cancelar",
                onPress: () => {}
              }
            ],
            {
              cancelable: false
            }
          );

          return {};
        } else {
          const user = JSON.stringify({
            data: userData.profile,
            accessToken: idTokenUser
          });

          await AsyncStorage.setItem("user", user);

          navigation.navigate("main");

          return {
            data: userData.profile,
            idTokenUser,
            success: "Login feito sucesso!"
          };
        }
      } else {
        throw { error: "Erro ao logar com o Facebook. Tente Novamente!" };
      }
    } catch ({ message }) {
      throw { error: "Erro ao logar com o Facebook. Tente Novamente!" };
    }
  }

  async loginInWithGoogle(navigation) {

    try {
      const result = await Google.logInAsync({
        androidClientId: authConfig.googleAndroidClientId,
        iosClientId: authConfig.googleIosClientId,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const isExists = await api.get(
          `/checkUserExistence/${result.user.email}`
        );

        if (!isExists.data) {
          Alert.alert(
            "Cadatrar",
            "Não existe uma conta criada com esse email. Deseja cadastra?",
            [
              {
                text: "OK",
                onPress: () =>
                  navigation.navigate("personalData", {
                    registrationData: {
                      email: result.user.email,
                      name: result.user.name,
                      photo: result.user.photoUrl,
                      hasUser: true
                    }
                  })
              },
              {
                text: "Cancelar",
                onPress: () => {}
              }
            ],
            {
              cancelable: false
            }
          );

        } else {
          const user = JSON.stringify({
            data: result.user,
            accessToken: result.accessToken
          });

          await AsyncStorage.setItem("user", user);

          navigation.navigate("main");

          return {
            data: result.user,
            idTokenUser: result.accessToken,
            success: "Login feito com sucesso!"
          };
        }
      } else {
        throw {
          error: "Não foi possível fazer login com o Google. Tente novamente!"
        };
      }
    } catch (e) {
      return {
        error: "Não foi possível fazer login com o Google. Tente novamente!"
      };
    }
  }

  async signUp(data) {
    const { hasUser } = data;

    if(hasUser){
      data.password = "12345678"
    }

    try {
      const response = await api.post(`/user?hasUser=${hasUser}`, data);
      return response;
    } catch (error) {
      console.log(error.response.data);
      throw {
        error:
          "Aconteceu algo errado ao cadastrar, tente novamente mais tarde.",
      };
    }
  }

  async logOut() {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.clear();
    } catch {
      throw { error: "Não foi possível Deslogar!" };
    }
  }

  isSignIn() {
    return this._token !== undefined;
  }

  async requestUserData(token) {
    const user = await api.get(`/user`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return user.data;
  }

  async verifyUserInfo(value) {
    const response = await api.get(`/checkUserExistence/${value}`);
    return !!response.data;
  }

  helpAnUser() {}
}

const userService = new UserService();
Object.freeze(userService);

export default userService;
