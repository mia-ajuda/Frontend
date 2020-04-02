import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { Icon } from "react-native-elements";

import Login from "./pages/Login";
import Location from "./pages/Location";
import SignUp from "./pages/SignUp";
import Photo from "./pages/Photo";
import Main from "./pages/Main";
import colors from "../assets/styles/colorVariables";

const BottomNavigation = createBottomTabNavigator();
const StackNavigation = createStackNavigator();

const MainRoutes = () => (
  <BottomNavigation.Navigator
    tabBarOptions={{
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

        if (route.name == "main") {
          selectConfig = focused
            ? {
                src: require("../assets/images/whileLogo.png"),
                size: { height: 40, width: 40 }
              }
            : {
                src: require("../assets/images/whiteCat.png"),
                size: { height: 25, width: 25, resizeMode: "contain" }
              };

          return <Image source={selectConfig.src} style={selectConfig.size} />;
        }

        if (route.name === "helpList") {
          selectConfig = focused
            ? { color: colors.primary, raised: true, name: "outdent" }
            : { color: colors.light, raised: false, name: "outdent" };
        }
        if (route.name === "needingList") {
          selectConfig = focused
            ? { color: colors.primary, raised: true, name: "outdent" }
            : { color: colors.light, raised: false, name: "outdent" };
        }
        if (route.name === "notification") {
          selectConfig = focused
            ? { color: colors.primary, raised: true, name: "bell" }
            : { color: colors.light, raised: false, name: "bell" };
        }
        if (route.name === "settings") {
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
        }

        return (
          <Icon
            raised={selectConfig.raised}
            size={18}
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
      <StackNavigation.Screen name="signup" component={SignUp} />
      <StackNavigation.Screen name="photo" component={Photo} />
    </StackNavigation.Navigator>
  </>
);

const Routes = () => (
  <NavigationContainer>
    <AuthRoutes />
  </NavigationContainer>
);

export default Routes;
