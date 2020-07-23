import React, { useReducer, createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { userReducer } from '../reducers/userReducer';
import UserService from '../../services/User';
import actions from '../actions';
import {
    requestPermissionsAsync,
    getCurrentPositionAsync,
} from 'expo-location';
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
        refreshFirebaseToken();
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

    function refreshFirebaseToken() {
        firebaseService.onAuthStateChanged(async function (user) {
            if (user && user.emailVerified) {
                user.getIdToken().then(async (acesstoken) => {
                    await AsyncStorage.setItem('accessToken', acesstoken);
                });
            }
            getUserInfo();
        });
    }

    async function getUserInfo() {
        const userPreviouslyLogged = await AsyncStorage.getItem('accessToken');

        if (userPreviouslyLogged) {
            try {
                const user = await UserService.requestUserData();

                dispatch({ type: actions.user.storeUserInfo, data: user });
            } catch (error) {
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
