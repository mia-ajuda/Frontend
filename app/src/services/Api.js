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
    async (error) => {
        console.log(error);
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log('error interceptors', error.message);
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            console.log('ifffffffffff');
            const correctRequest = await firebaseService
                .getUserId()
                .then(async (idTokenUser) => {
                    await AsyncStorage.setItem('accessToken', idTokenUser);
                    originalRequest.headers.Authorization = `Bearer ${idTokenUser}`;
                    return await axios(originalRequest);
                });
            return correctRequest;
        }
    },
);

export default api;
