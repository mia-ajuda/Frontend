import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { Icon, Tile } from "react-native-elements";

import Login from "./pages/authPages/Login";
import Location from "./pages/authPages/Location";
import RegistrationData from "./pages/authPages/RegistrationData";
import PersonalData from "./pages/authPages/PersonalData";
import RiskGroup from "./pages/authPages/RiskGroup";
import Photo from "./pages/authPages/Photo";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import Main from "./pages/Main";
import colors from "../assets/styles/colorVariables";
import CreateHelp from "./pages/helpPages/createHelp";
import fonts from "../assets/styles/fontVariable";

const BottomNavigation = createBottomTabNavigator();
const StackNavigation = createStackNavigator();
const backImage = require("../assets/images/back.png");

const MainRoutes = () => (
  <BottomNavigation.Navigator
    tabBarOptions={{
      style: {
        height: 60,
      },
      keyboardHidesTabBar: true,
      activeTintColor: colors.light,
      inactiveTintColor: colors.dark,
      inactiveBackgroundColor: colors.primary,
      activeBackgroundColor: colors.primary,
      tabStyle: {
        justifyContent: "center",
      },
      showLabel: false,
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let selectConfig;

        switch (route.name) {
          case "main":
            selectConfig = focused
              ? {
                  src: require("../assets/images/whileLogo.png"),
                  size: { height: 40, width: 40 },
                }
              : {
                  src: require("../assets/images/whiteCat.png"),
                  size: { height: 25, width: 25, resizeMode: "contain" },
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
                  name: "user-circle",
                }
              : {
                  color: colors.light,
                  raised: false,
                  name: "user-circle",
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
      },
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
        headerBackImage: () => (
          <Image
            source={backImage}
            style={{
              flex: 1,
              resizeMode: "contain",
              width: 10,
              marginLeft: 5,
            }}
          />
        ),
        headerShown: false,
        headerStyle: {
          height: 100,
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          ...fonts.title,
          color: colors.light,
          fontFamily: "montserrat-medium",
        },

        headerTintColor: colors.light,
        headerTitleAlign: "center",
      }}
    >
      <StackNavigation.Screen name="login" component={Login} />
      <StackNavigation.Screen name="location" component={Location} />
      <StackNavigation.Screen
        name="registrationData"
        component={RegistrationData}
      />
      <StackNavigation.Screen name="personalData" component={PersonalData} />
      <StackNavigation.Screen name="riskGroup" component={RiskGroup} />
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
    <MainRoutes />
  </NavigationContainer>
);

export default Routes;
