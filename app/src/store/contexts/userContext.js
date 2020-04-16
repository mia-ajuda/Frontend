import React, { useReducer, createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { userReducer } from "../reducers/userReducer";
import actions from "../actions";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, {
    isLoading: true,
    user: null,
  });

  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function getUserFromAsyncStorage() {
      const user = await AsyncStorage.getItem("user");
      const userJSON = JSON.parse(user);
      if (userJSON) {
        await getLocation();
        dispatch({ type: actions.user.auth, data: userJSON });
      }
    }
    getUserFromAsyncStorage();
  }, []);

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

  return (
    <UserContext.Provider value={{ user, dispatch, currentRegion }}>
      {props.children}
    </UserContext.Provider>
  );
};
