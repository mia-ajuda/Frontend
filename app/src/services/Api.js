import axios from "axios";
import { AsyncStorage } from "react-native";

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
