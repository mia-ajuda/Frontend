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
    showSplash: false,
  });
  const [currentRegion, setCurrentRegion] = useState(null);
  
  
  async function getUserInfo() {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      const user = await UserService.requestUserData();
      dispatch({ type: actions.user.storeUserInfo, data: user });
    } else {
      dispatch({ type: actions.user.requestSignIn });
    }
  }
  
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        user.getIdToken().then(async (acesstoken)=>{
          await AsyncStorage.setItem("accessToken",acesstoken);
          getUserInfo();
        })
      }
      else{
          getUserInfo();
      }
    });
  },[])

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
    <UserContext.Provider value={{ user, dispatch, currentRegion}}>
      {props.children}
    </UserContext.Provider>
  );
};


