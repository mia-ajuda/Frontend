import React, { useReducer, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userReducer } from '../reducers/userReducer';
import UserService from '../../services/User';
import EntityService from '../../services/Entity';
import actions from '../actions';
import env from '../../config/envVariables';

import {
    getCurrentPositionAsync,
    requestForegroundPermissionsAsync,
} from 'expo-location';
import callService from '../../services/callService';
import firebaseService from '../../services/Firebase';
export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, dispatch] = useReducer(userReducer, {
        showSplash: true,
    });
    const [userPosition, setUserPosition] = useState(null);
    const isEntity = user.cnpj;

    useEffect(() => {
        setFirebaseTokenListener();
    }, []);

    useEffect(() => {
        async function getLocation() {
            const { granted } = await requestForegroundPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const { latitude, longitude } = coords;
                setUserPosition({
                    latitude,
                    longitude,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                });
            }
        }
        getLocation();
    }, []);

    function setFirebaseTokenListener() {
        firebaseService.onAuthStateChanged(async function (user) {
            const userEmailVerified = user && user.emailVerified;
            const developmentEnviroment = user && env.development;

            if (userEmailVerified || developmentEnviroment) {
                const acesstoken = await callService(
                    firebaseService,
                    'getUserId',
                );
                await AsyncStorage.setItem('accessToken', acesstoken);
            }
            await getUserInfo(user);
        });
    }

    async function getUserInfo(user) {
        const userPreviouslyLogged = await AsyncStorage.getItem('accessToken');
        const userType = user?.displayName.split('|')[1]?.trim();

        if (userPreviouslyLogged) {
            let userRequest;
            if (userType == 'PJ') {
                userRequest = await callService(
                    EntityService,
                    'requestEntityData',
                );
            } else {
                userRequest = await callService(UserService, 'requestUserData');
            }

            if (!userRequest.error) {
                dispatch({
                    type: actions.user.storeUserInfo,
                    data: userRequest,
                });
            } else {
                dispatch({ type: actions.user.requestSignIn });
            }
        } else {
            dispatch({ type: actions.user.requestSignIn });
        }
    }

    return (
        <UserContext.Provider
            value={{
                user,
                dispatch,
                userPosition,
                setUserPosition,
                isEntity,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
