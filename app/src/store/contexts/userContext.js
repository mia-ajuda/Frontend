import React, { useReducer, createContext, useState, useEffect } from "react";
import { userReducer } from "../reducers/userReducer";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer);
  const [currentRegion, setCurrentRegion] = useState(null);

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
    <UserContext.Provider value={{ user, dispatch, currentRegion }}>
      {props.children}
    </UserContext.Provider>
  );
};
