import api from "../services/Api";

class UserService {
  constructor() {}

  async logIn() {
    return await this.requestUserData();
  }

  logOut() {}
  signUp() {}

  isSignIn() {
    return this._token !== undefined;
  }

  async requestUserData() {
    const user = await api.get(`/user/${this._id}`);
    return user.data;
  }

  helpAnUser() {}
}

const userService = new UserService();
Object.freeze(userService);

export default userService;
