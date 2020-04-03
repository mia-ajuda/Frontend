import api from "../services/Api";

class User {
  _id = "5e87703c2f7c740026d916fd";
  _name;
  _birthday;
  _cpf;
  _photo;
  _adress;
  _location;
  _phone;
  _registerData;
  _token;

  constructor() {}

  signIn(email, senha) {}
  singOut() {}
  signUp(user) {}

  isSignIn() {
    return this._token !== undefined;
  }
  getLocation() {}

  setUserData(data) {
    this._id = data._id;
    this._name = data.name;
    this._birthday = data.birthday;
    this._cpf = data.cpf;
    this._photo = data.photo;
    this._adress = data.adress;
    this._location = data.location;
    this._phone = data.phone;
    this._registerData = data.registerData;
  }

  async getUserData() {
    //const response = await
    return (await api.get(`/user/${this._id}`)).data;
  }

  helpAnUser() {}
}

const user = new User();
Object.freeze(user);

export default user;
