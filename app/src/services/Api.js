import axios from 'axios';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import ENV from '../config/envVariables';

const api = axios.create({
  baseURL: ENV.apiUrl,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.log(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      const correctRequest = await firebase
        .auth()
        .currentUser.getIdToken()
        .then(async (idTokenUser) => {
          await AsyncStorage.setItem('accessToken', idTokenUser);
          originalRequest.headers.Authorization = `Bearer ${idTokenUser}`;
          try {
            return await axios(originalRequest);
          } catch (error) {
            throw error;
          }
        });
      return correctRequest;
    } else {
      throw error;
    }
  },
);

export default api;
