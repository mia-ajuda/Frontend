import api from "../services/Api";
import firebaseAuth from "./firebaseAuth";
import { AsyncStorage } from "react-native";

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
