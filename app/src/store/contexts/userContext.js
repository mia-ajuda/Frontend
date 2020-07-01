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
    const [currentRegion, setCurrentRegion] = useState(null);

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
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                });
            }
        }
        getLocation();
    }, []);

    async function getUserInfo() {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
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
        <UserContext.Provider value={{ user, dispatch, currentRegion }}>
            {props.children}
        </UserContext.Provider>
    );
};
