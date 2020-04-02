import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { Icon } from "react-native-elements";

import Login from "./pages/authPages/Login";
import Location from "./pages/authPages/Location";
import SignUp from "./pages/authPages/SignUp";
import Photo from "./pages/authPages/Photo";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import Main from "./pages/Main";
import colors from "../assets/styles/colorVariables";

const BottomNavigation = createBottomTabNavigator();
const StackNavigation = createStackNavigator();

const MainRoutes = () => (
  <BottomNavigation.Navigator
    tabBarOptions={{
      style: {
        height: 60
      },
      activeTintColor: colors.light,
      inactiveTintColor: colors.dark,
      inactiveBackgroundColor: colors.primary,
      activeBackgroundColor: colors.primary,
      tabStyle: {
        justifyContent: "center"
      },
      showLabel: false
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let selectConfig;
        let icon;

        switch (route.name) {
          case "main":
            selectConfig = focused
              ? {
                  src: require("../assets/images/whileLogo.png"),
                  size: { height: 40, width: 40 }
                }
              : {
                  src: require("../assets/images/whiteCat.png"),
                  size: { height: 25, width: 25, resizeMode: "contain" }
                };
            return (
              <Image source={selectConfig.src} style={selectConfig.size} />
            );

          case "helpList":
            selectConfig = focused
              ? { color: colors.primary, raised: true, name: "outdent" }
              : { color: colors.light, raised: false, name: "outdent" };
            break;

          case "needingList":
            selectConfig = focused
              ? { color: colors.primary, raised: true, name: "outdent" }
              : { color: colors.light, raised: false, name: "outdent" };
            break;
          case "notification":
            selectConfig = focused
              ? { color: colors.primary, raised: true, name: "bell" }
              : { color: colors.light, raised: false, name: "bell" };
            break;
          case "settings":
            selectConfig = focused
              ? {
                  color: colors.primary,
                  raised: true,
                  name: "user-circle"
                }
              : {
                  color: colors.light,
                  raised: false,
                  name: "user-circle"
                };
            break;
        }

        return (
          <Icon
            raised={selectConfig.raised}
            size={20}
            name={selectConfig.name}
            type="font-awesome"
            color={selectConfig.color}
          />
        );
      }
    })}
    initialRouteName="main"
  >
    <BottomNavigation.Screen name="notification" component={Main} />
    <BottomNavigation.Screen name="helpList" component={Main} />
    <BottomNavigation.Screen name="main" component={Main} />
    <BottomNavigation.Screen name="needingList" component={Main} />
    <BottomNavigation.Screen name="settings" component={Main} />
  </BottomNavigation.Navigator>
);

const AuthRoutes = () => (
  <>
    <StackNavigation.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false
      }}
    >
      <StackNavigation.Screen name="login" component={Login} />
      <StackNavigation.Screen name="location" component={Location} />
      <StackNavigation.Screen name="signUp" component={SignUp} />
      <StackNavigation.Screen name="photo" component={Photo} />
      <StackNavigation.Screen name="main" component={MainRoutes} />
      <StackNavigation.Screen
        name="forgotPassword"
        component={ForgotPassword}
      />
    </StackNavigation.Navigator>
  </>
);

const Routes = () => (
  <NavigationContainer>
    <AuthRoutes />
  </NavigationContainer>
);

export default Routes;
