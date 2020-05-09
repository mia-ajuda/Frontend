import axios from "axios";
import { AsyncStorage } from "react-native";
import firebase from "firebase";
import ENV from "../config/envVariables";
import UserContext from "../store/contexts/userContext"

const api = axios.create({
  baseURL: ENV.apiUrl,
});

api.interceptors.request.use(
  async (config) => {
    console.log('REQUEST 1')
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log(accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log('request 2')
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
    console.log(error+'ERROR NA API')
    const originalRequest = error.config;

    console.log(JSON.parse(JSON.stringify(originalRequest)));
    console.log('1')
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log("   2");
        const idTokenUser = await firebase.auth().currentUser.getIdToken();
        console.log(idTokenUser)
        console.log('3')
        console.log(originalRequest.headers)
        console.log(4)
        console.log(originalRequest.headers.Authorization)
        console.log(5)
        originalRequest.headers.Authorization = `Bearer ${idTokenUser}`;
        console.log(originalRequest.headers.Authorization)
        await AsyncStorage.setItem("accessToken", idTokenUser)
        return axios(originalRequest);
    }
    throw error;
   
  }
);

export default api;

