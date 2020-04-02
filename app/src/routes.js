import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./pages/Main";
import colors from "../assets/styles/colorVariables";

const BottomNavigation = createBottomTabNavigator();

const Routes = () => (
  <NavigationContainer>
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
  </NavigationContainer>
);

export default Routes;
