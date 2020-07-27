import React, { useReducer, createContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { userReducer } from '../reducers/userReducer';
import UserService from '../../services/User';
import actions from '../actions';
import {
    requestPermissionsAsync,
    getCurrentPositionAsync,
} from 'expo-location';

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

    async function getUserInfo() {
        const userPreviouslyLogged = await AsyncStorage.getItem('accessToken');

        if (userPreviouslyLogged) {
            try {
                const user = await UserService.requestLoggedUserData();

                dispatch({ type: actions.user.storeUserInfo, data: user });
            } catch (error) {
                dispatch({ type: actions.user.requestSignIn });
            }
        } else {
            dispatch({ type: actions.user.requestSignIn });
        }
    }

    useEffect(() => {
        getUserInfo();
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

    return (
        <UserContext.Provider
            value={{ user, dispatch, userPosition, setUserPosition }}>
            {props.children}
        </UserContext.Provider>
    );
};
