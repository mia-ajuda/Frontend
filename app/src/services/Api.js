import axios from 'axios';
import { AsyncStorage } from 'react-native';
import ENV from '../config/envVariables';
import firebaseService from './Firebase';

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
        if (error.response != undefined) {
            if (error.response.status === 401) {
                const correctRequest = await firebaseService
                    .getUserId()
                    .then(async (idTokenUser) => {
                        await AsyncStorage.setItem('accessToken', idTokenUser);
                        originalRequest.headers.Authorization = `Bearer ${idTokenUser}`;
                        return await axios(originalRequest);
                    });
                return correctRequest;
            }
        }
        throw error;
    },
);

export default api;
