import axios from "axios";
import { AsyncStorage } from "react-native";
import firebase from "firebase";
import ENV from "../config/envVariables";

export default api = axios.create({
  baseURL: ENV.apiUrl,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          return axios(originalRequest);
        });
    }
    throw error;
  }
);
