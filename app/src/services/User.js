import api from "../services/Api";
import firebaseAuth from "./firebaseAuth";
import { AsyncStorage } from "react-native";
import { Notifications } from 'expo';

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

      const user = JSON.stringify({
        data: userInfo,
        accessToken: idTokenUser,
      });

      setUserDeviceId(userInfo._id, idTokenUser);

      await AsyncStorage.setItem("user", user);     
    } catch (error) {
      console.log(error);
      throw { error: "Não foi possível fazer o login!" };
    }
  }

  async signUp(data) {
    try {
      const response = await api.post("/user", data);
      return response;
    } catch (err) {
      throw "Não foi possível fazer o cadastro. Tente novamente!";
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

  helpAnUser() {}
}

const userService = new UserService();
Object.freeze(userService);

export default userService;
