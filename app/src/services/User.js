import api from "../services/Api";
import firebaseAuth from "./firebaseAuth";
import { AsyncStorage } from "react-native";
import * as Facebook from 'expo-facebook';
import firebase  from 'firebase';
import * as Google from 'expo-google-app-auth';

class UserService {
  constructor() {}

  async logIn(data) {
    try {
      await firebaseAuth
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      const idTokenUser = await firebaseAuth.auth().currentUser.getIdToken();
      const userInfo = await this.requestUserData(idTokenUser);

      const user = {
        info: userInfo,
        accessToken: idTokenUser,
      };

      await AsyncStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      throw { error: error.response.data.error };
    }
  }

  async logInWithFacebook() {
    try {
      await Facebook.initializeAsync('279998959666055');
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: [
          'public_profile',
          'email',
        ],
      });

      if (type === 'success') {

        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInWithCredential(credential);  // Sign in with Facebook credential

        const userData = facebookProfileData.additionalUserInfo;

        const idTokenUser = await firebase.auth().currentUser.getIdToken();

        const user = JSON.stringify({
          data: userData.profile,
          accessToken: idTokenUser,
        });
  
        await AsyncStorage.setItem("user", user);
        return { success: "Login feito sucesso!" };
      } else {
      }
    } catch ({ message }) {
      return { error: 'Erro ao logar com o facebook. Tente Novamente!' }
    }

  }

  async signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '835532070673-cmops44pghnnsgbnl0t3a39rpfuqh9j5.apps.googleusercontent.com',
        iosClientId: '835532070673-g2r9pf8tske7q9a4oa2vktk18jav8aqr.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });


      if (result.type === 'success') {
        const user = JSON.stringify({
          data: result.user,
          accessToken: result.accessToken,
        });

        await AsyncStorage.setItem("user", user);
        return { success: "Login feito com sucesso!" };
      } else {
        throw { error: "Não foi possível fazer login com o gGogle. Tente novamente!" } 
      }
    } catch (e) {
      return { error: "Não foi possível fazer login com o Google. Tente novamente!" };
    }
  }

  async signUp(data) {
    try {
      const response = await api.post("/user", data);
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
        authorization: `Bearer ${token}`,
      },
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
