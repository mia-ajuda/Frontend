import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, StatusBar, View, Text } from "react-native";
import { Icon, Tile } from "react-native-elements";
import { UserContext } from "./store/contexts/userContext";
import Constants from "expo-constants";

import Profile from "./pages/profile/ListProfile";
import EditProfile from "./pages/profile/EditProfile";
import Notification from "./pages/notification";
import on_goingGivenHelp from "./pages/helpPages/givenHelps/on_going";
import finishedGivenHelp from "./pages/helpPages/givenHelps/finished";
import Login from "./pages/authPages/Login";
import Location from "./pages/authPages/Location";
import RegistrationData from "./pages/authPages/RegistrationData";
import PersonalData from "./pages/authPages/PersonalData";
import RiskGroup from "./pages/authPages/RiskGroup";
import Photo from "./pages/authPages/Photo";
import Address from "./pages/authPages/Address";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import Main from "./pages/Main";

import OnGoingHelps from "./pages/helpPages/MyRequests/onGoing";
import DoneHelps from "./pages/helpPages/MyRequests/doneHelps";

import colors from "../assets/styles/colorVariables";
import CreateHelp from "./pages/helpPages/createHelp";
import fonts from "../assets/styles/fontVariable";
import Splash from "./pages/splash";
import HelpDescription from "./pages/helpPages/helpDescription";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HelpContext } from "./store/contexts/helpContext";

const backImage = require("../assets/images/back.png");

const BottomNavigation = createBottomTabNavigator();
const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HelpTopBarNavigation = createMaterialTopTabNavigator();
const MyRequestsTab = createMaterialTopTabNavigator();
const stack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MainNavigation = () => (
  <>
    <MainStack.Navigator initialRouteName="main" screenOptions={headerStyle}>
      <MainStack.Screen
        name="main"
        component={Main}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="createHelp"
        options={{ title: "Pedir ajuda" }}
        component={CreateHelp}
      />
      <MainStack.Screen
        name="helpDescription"
        options={({ route }) => ({
          title: route.params.helpTitle
        })}
        component={HelpDescription}
      />
    </MainStack.Navigator>
  </>
);

const navigationGivenHelps = () => {
  return (
    <HelpTopBarNavigation.Navigator
      initialRouteName="em andamento"
      tabBarOptions={tabTopBarOptions}
    >
      <HelpTopBarNavigation.Screen
        name="em andamento"
        component={on_goingGivenHelp}
      />
      <HelpTopBarNavigation.Screen
        name="finalizadas"
        component={finishedGivenHelp}
      />
    </HelpTopBarNavigation.Navigator>
  );
};

const HelpTopBar = () => (
  <>
    <stack.Navigator screenOptions={headerStyle}>
      <stack.Screen name="Minhas Ofertas" component={navigationGivenHelps} />
      <stack.Screen
        name="Description"
        component={HelpDescription}
        options={({ route }) => ({
          title: route.params.helpTitle
        })}
      />
    </stack.Navigator>
  </>
);

const navigationAskedHelps = () => {
  return (
    <MyRequestsTab.Navigator
      initialRouteName="em andamento"
      tabBarOptions={tabTopBarOptions}
    >
      <MyRequestsTab.Screen name="em andamento" component={OnGoingHelps} />
      <MyRequestsTab.Screen name="finalizadas" component={DoneHelps} />
    </MyRequestsTab.Navigator>
  );
};

const MyRequestsNavigation = () => (
  <>
    <stack.Navigator screenOptions={headerStyle}>
      <stack.Screen name="Meus pedidos" component={navigationAskedHelps} />
      <stack.Screen
        name="Description"
        component={HelpDescription}
        options={({ route }) => ({
          title: route.params.helpTitle
        })}
      />
    </stack.Navigator>
  </>
);

const ProfileNavigation = () => (
  <>
    <ProfileStack.Navigator screenOptions={headerStyle}>
      <ProfileStack.Screen name="Perfil" component={Profile} />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ route }) => ({
          title: "Editar Perfil"
        })}
      />
    </ProfileStack.Navigator>
  </>
);

const BottomTab = () => {
  const { loadingHelps } = useContext(HelpContext);

  if (loadingHelps) return <Splash />;
  return (
    <BottomNavigation.Navigator
      tabBarOptions={{
        style: {
          height: 60,
          borderTopColor: colors.primary,
          shadowOpacity: 0,
          elevation: 0
        },
        keyboardHidesTabBar: true,
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
        tabBarIcon: ({ focused }) => {
          let selectConfig;

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

            case "givenHelp":
              selectConfig = focused
                ? { color: colors.primary, raised: true, name: "outdent" }
                : { color: colors.light, raised: false, name: "outdent" };
              break;
            case "notification":
              selectConfig = focused
                ? { color: colors.primary, raised: true, name: "bell" }
                : { color: colors.light, raised: false, name: "bell" };
              break;
            case "profile":
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
      <BottomNavigation.Screen name="notification" component={Notification} />
      <BottomNavigation.Screen
        name="helpList"
        component={MyRequestsNavigation}
      />
      <BottomNavigation.Screen name="main" component={MainNavigation} />
      <BottomNavigation.Screen name="givenHelp" component={HelpTopBar} />
      <BottomNavigation.Screen name="profile" component={ProfileNavigation} />
    </BottomNavigation.Navigator>
  );
};

const AuthRoutes = () => {
  const { user } = useContext(UserContext);
  if (user && user.showSplash) {
    return <Splash />;
  }

  return (
    <>
      <AuthStack.Navigator
        initialRouteName="login"
        screenOptions={{
          headerShown: false
        }}
      >
        <AuthStack.Screen name="login" component={Login} />
        <AuthStack.Screen name="location" component={Location} />
        <AuthStack.Screen name="address" component={Address} />
        <AuthStack.Screen
          name="registrationData"
          component={RegistrationData}
        />
        <AuthStack.Screen name="personalData" component={PersonalData} />
        <AuthStack.Screen name="riskGroup" component={RiskGroup} />
        <AuthStack.Screen name="photo" component={Photo} />
        <AuthStack.Screen name="main" component={BottomTab} />
        <AuthStack.Screen name="forgotPassword" component={ForgotPassword} />
      </AuthStack.Navigator>
    </>
  );
};

const headerStyle = {
  headerBackImage: () => (
    <Image
      source={backImage}
      style={{
        flex: 1,
        resizeMode: "contain",
        width: 10,
        marginLeft: 5
      }}
    />
  ),
  headerStyle: {
    height: 90,
    backgroundColor: colors.primary
  },
  headerTitleStyle: {
    ...fonts.title,
    color: colors.light,
    fontFamily: "montserrat-medium",
    marginHorizontal: 30
  },

  headerTintColor: colors.light,
  headerTitleAlign: "center"
};

const tabTopBarOptions = {
  style: {
    backgroundColor: colors.primary
  },
  labelStyle: {
    ...fonts.body,
    color: colors.light,
    fontSize: 14
  },
  indicatorStyle: {
    backgroundColor: colors.light,
    padding: 2
  }
};

const Routes = () => {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      {user._id ? <BottomTab /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;