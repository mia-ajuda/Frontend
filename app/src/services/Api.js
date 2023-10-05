import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENV from '../config/envVariables';
import firebaseService from './Firebase';
import jwt_decode from 'jwt-decode';

const api = axios.create({
    baseURL: ENV.apiUrl,
});

api.interceptors.request.use(
    async (config) => {
        let accessToken = await AsyncStorage.getItem('accessToken');
        const user = await firebaseService.getCurrentUser();
        if (user && accessToken) {
            const expireDate = jwt_decode(accessToken).exp;
            const now = Date.now() / 1000;

            if (now > expireDate) {
                const newToken = await firebaseService.getUserId();
                await AsyncStorage.setItem('accessToken', newToken);
                accessToken = newToken;
            }
        }

        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        console.log(error);
    },
);

export default api;
