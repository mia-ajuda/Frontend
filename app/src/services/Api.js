import axios from "axios";
import { AsyncStorage } from "react-native";
import firebase from "firebase";
import ENV from "../config/envVariables";


const api = axios.create({
  baseURL: ENV.apiUrl,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.log(error+9);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log('ok')
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("2");
      await firebase.auth().currentUser.getIdToken().then(async (idTokenUser) => {
        console.log(idTokenUser + 'ok')
        await AsyncStorage.setItem("accessToken", idTokenUser);
        return api.request(originalRequest);
      })
    }
    throw error;
  }
);

export default api;

