import axios from "axios";
import { AsyncStorage } from "react-native";
import firebase from "firebase";
import ENV from "../config/envVariables";

const api = axios.create({
  baseURL: ENV.apiUrl,
});

api.interceptors.request.use(
  async (config) => {
    console.log('REQUEST 1')
    const accessToken = await AsyncStorage.getItem("accessToken");
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

    if (error.response.status === 401) {
        console.log("to fora");
        const correctRequest = await firebase.auth().currentUser.getIdToken().then(async (idTokenUser) => {
          console.log("entrou1");
          await AsyncStorage.setItem("accessToken", idTokenUser);
          originalRequest.headers.Authorization = `Bearer ${idTokenUser}`;
          try{
            return await axios(originalRequest);
          }catch(error){
            console.log('error na API 2.000')
            throw (error+'vindo do axios');
          }
        });
        return correctRequest;
       
    }
    else{
      throw (error+'error vindo da api');
    }
   
  }
);

export default api;

