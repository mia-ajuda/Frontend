import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

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
      }
    }}
    initialRouteName="main"
  >
    <BottomNavigation.Screen name="profile" component={Main} />
    <BottomNavigation.Screen name="list1" component={Main} />
    <BottomNavigation.Screen name="main" component={Main} />
    <BottomNavigation.Screen name="list2" component={Main} />
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
