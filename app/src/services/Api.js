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
    //console.log(accessToken)
    console.log('interceptor');
    console.log(JSON.parse(JSON.stringify(config)));
    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log('request 2')
    return config;
  },
  (error) => {
    console.log(error+9);
  }
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log(error+'ERROR NA API')
    const originalRequest = error.config;

    //console.log(JSON.parse(JSON.stringify(originalRequest)));
    //console.log('1')
    if (error.response.status === 401) {
      //originalRequest._retry = true;
        console.log("to fora");
        await firebase.auth().currentUser.getIdToken().then(async (idTokenUser) => {
          console.log("entrou1");
          await AsyncStorage.setItem("accessToken", idTokenUser);
          originalRequest.headers.Authorization = `Bearer ${idTokenUser}`;
          console.log(JSON.parse(JSON.stringify(originalRequest)));
          console.log('depois do setItem');
          try{
            console.log('dentro do try catch');
            return await axios(originalRequest);
            console.log("comeco das ajudas")
            console.log('ajudas'+helps2.data)
            console.log('depois do request');
            return helps2;
            //console.log(JSON.parse(JSON.stringify(requestError)));
            //console.log('request error acima');
            //console.log(JSON.parse(JSON.stringify(requestError.data)));
            //console.log('request  error.data acima');
            //return requestError.data;
          }catch(error){
            console.log('error na API 2.000')
            throw (error+'vindo do axios');
          }
          
        //console.log(idTokenUser)
        //console.log(3);
        //console.log(originalRequest.headers.Authorization)
        //console.log(4)
        
        //console.log(originalRequest.headers.Authorization)
        //console.log(5)
        });
       

    }
    else{
      throw (error+'error vindo da api');
    }
   
  }
);

export default api;

