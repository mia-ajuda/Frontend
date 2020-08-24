import React, { useReducer, createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { userReducer } from '../reducers/userReducer';
import UserService from '../../services/User';
import EntityService from '../../services/Entity';
import actions from '../actions';
import env from '../../config/envVariables';

import {
    requestPermissionsAsync,
    getCurrentPositionAsync,
} from 'expo-location';
import useService from '../../services/useService';
import firebaseService from '../../services/Firebase';
export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, dispatch] = useReducer(userReducer, {
        showSplash: true,
    });
    const [userPosition, setUserPosition] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
    });

    useEffect(() => {
        setFirebaseTokenListener();
    }, []);

    useEffect(() => {
        async function getLocation() {
            const { granted } = await requestPermissionsAsync();
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
                const acesstoken = await useService(
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
        if (userPreviouslyLogged && user) {
            const userName = user.displayName.split('|');
            const userType = userName.length === 1 ? 'PF' : userName[1].trim();
            let userRequest;
            if (userType == 'PJ') {
                userRequest = await useService(
                    EntityService,
                    'requestEntityData',
                );
            } else {
                userRequest = await useService(UserService, 'requestUserData');
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
            value={{ user, dispatch, userPosition, setUserPosition }}>
            {props.children}
        </UserContext.Provider>
    );
};
