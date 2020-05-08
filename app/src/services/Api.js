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
    console.log(error)
    const originalRequest = error.config;

    console.log(JSON.parse(JSON.stringify(originalRequest)));
    console.log('ok')
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log(JSON.parse(JSON.stringify(originalRequest)))
        console.log("   2");
        firebase.auth().onAuthStateChanged(async function (user) {
          if (user) {
              console.log('a');
              const idTokenUser = await firebase.auth().currentUser.getIdToken();
              console.log(idTokenUser)
              console.log('b')
              await AsyncStorage.setItem("accessToken", idTokenUser);
              console.log('c');
              return Axios(originalRequest);
          } 
          else {
              console.log("No user is logged in")
              throw error;
          }
        });  
    }
   
  }
);

export default api;

