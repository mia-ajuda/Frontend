import React, { useReducer, createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { userReducer } from "../reducers/userReducer";
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
  const [firebaseUser, setFirebaseUser] = useState(false);
  useEffect(() => {
    async function getUserFromAsyncStorage() {
      const user = await AsyncStorage.getItem("user");
      const userJSON = JSON.parse(user);
      if (userJSON) {
        dispatch({ type: actions.user.storeUserInfo, data: userJSON });
      } else {
        dispatch({ type: actions.user.requestSignIn });
      }
    }
    getUserFromAsyncStorage();
  }, []);

  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      console.log('a');
      setFirebaseUser(true)
    }
    else {
      setFirebaseUser(false);
    }
  });

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

  return (
    <UserContext.Provider value={{ user, dispatch, currentRegion,firebaseUser}}>
      {props.children}
    </UserContext.Provider>
  );
};


