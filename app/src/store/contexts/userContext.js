import React, { useReducer, createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { userReducer } from "../reducers/userReducer";
import UserService from "../../services/User";
import actions from "../actions";
import firebase from "firebase";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, {
    showSplash: true,
  });
  const [currentRegion, setCurrentRegion] = useState(null);

  async function getUserInfo() {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const user = await UserService.requestUserData();
        user.birthday = parseDate(user.birthday);
        console.log(user.birthday);
        dispatch({ type: actions.user.storeUserInfo, data: user });
      } catch (error) {
        dispatch({ type: actions.user.requestSignIn });
      }
    } else {
      dispatch({ type: actions.user.requestSignIn });
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        user.getIdToken().then(async (acesstoken) => {
          await AsyncStorage.setItem("accessToken", acesstoken);
          getUserInfo();
        });
      } else {
        getUserInfo();
      }
    });
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

  function parseDate(date) {
    const newDate = new Date(date);
    return `${("0" + (newDate.getDate() + 1)).slice(-2)}/${(
      "0" +
      (newDate.getMonth() + 1)
    ).slice(-2)}/${newDate.getFullYear()}`;
  }

  return (
    <UserContext.Provider value={{ user, dispatch, currentRegion }}>
      {props.children}
    </UserContext.Provider>
  );
};
