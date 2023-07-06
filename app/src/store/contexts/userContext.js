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
import SessionService from '../../services/Session';
export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, dispatch] = useReducer(userReducer, {
        showSplash: true,
    });
    const [userPosition, setUserPosition] = useState(null);
    const isEntity = user.cnpj;

    useEffect(() => {
        setFirebaseTokenListener();
        getLocation();
    }, []);

    useEffect(() => {
        if (Object.keys(user).length > 1 && userPosition) {
            const service = isEntity ? EntityService : UserService;
            const functionName = isEntity ? 'editEntity' : 'editUser';
            const location = {
                type: 'Point',
                coordinates: [userPosition.longitude, userPosition.latitude],
            };
            callService(service, functionName, [{ location }]);
        }
    }, [user, userPosition]);

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
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        }
    }

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

    async function editProfile(data) {
        const service = isEntity ? EntityService : UserService;
        const functionName = isEntity ? 'editEntity' : 'editUser';
        return await callService(service, functionName, [data]);
    }

    async function editAddress(data) {
        const service = isEntity ? EntityService : UserService;
        const functionName = isEntity ? 'editEntityAdress' : 'editUserAdress';
        return await callService(service, functionName, [data]);
    }

    async function fetchUserInfo(userId) {
        console.log(userId);
        return await callService(UserService, 'getAnyUser', [userId]);
    }

    async function logout() {
        const response = await callService(SessionService, 'signOut');
        if (response)
            dispatch({
                type: actions.user.removeUserInfo,
            });
    }

    return (
        <UserContext.Provider
            value={{
                user,
                dispatch,
                userPosition,
                setUserPosition,
                isEntity,
                env,
                editProfile,
                editAddress,
                fetchUserInfo,
                logout,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
