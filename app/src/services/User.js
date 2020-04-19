import api from "../services/Api";
import firebaseAuth from "./firebaseAuth";
import { AsyncStorage } from "react-native";
import { Notifications } from 'expo';
import * as Facebook from 'expo-facebook';
import firebase  from 'firebase';

class UserService {
  constructor() {}

  async logIn(data) {

    const setUserDeviceId = async (userId, firebaseToken) => {
      try{
        Notifications.getExpoPushTokenAsync().then(async (pushToken) => {
          await api.put(`/user`, {deviceId: pushToken}, {
            headers: {
              authorization: `Bearer ${firebaseToken}`,
            }
          });
        });
      }catch {
        throw {error: "Não foi possível recuperar Puhsh Token!"}
      }


    }

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

      setUserDeviceId(userInfo._id, idTokenUser);
 
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
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
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
