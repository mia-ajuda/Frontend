import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'react-native';
import OnGoingHelps from '../../../pages/helpPages/MyRequests/onGoing';
import DoneHelps from '../../../pages/helpPages/MyRequests/doneHelps';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';
import HelpDescription from '../../../pages/helpPages/helpDescription';
import backImage from '../../../../assets/images/back.png';

const MyRequestsTab = createMaterialTopTabNavigator();
const stack = createStackNavigator();

const navigationAskedHelps = () => (
    <MyRequestsTab.Navigator
        initialRouteName="em andamento"
        tabBarOptions={tabTopBarOptions}>
        <MyRequestsTab.Screen name="em andamento" component={OnGoingHelps} />
        <MyRequestsTab.Screen name="finalizados" component={DoneHelps} />
    </MyRequestsTab.Navigator>
);

const MyRequestsNavigation = () => (
    <stack.Navigator screenOptions={headerStyle}>
        <stack.Screen name="Meus pedidos" component={navigationAskedHelps} />
        <stack.Screen
            name="RequestDescription"
            component={HelpDescription}
            options={({ route }) => ({
                title: route.params.helpTitle,
            })}
        />
    </stack.Navigator>
);

const tabTopBarOptions = {
    style: {
        backgroundColor: colors.primary,
    },
    labelStyle: {
        ...fonts.body,
        color: colors.light,
        fontSize: 14,
    },
    indicatorStyle: {
        backgroundColor: colors.light,
        padding: 2,
    },
};

const headerStyle = {
    headerBackImage: () => (
        <Image
            source={backImage}
            style={{
                flex: 1,
                resizeMode: 'contain',
                width: 10,
                marginLeft: 5,
            }}
        />
    ),
    headerStyle: {
        height: 90,
        backgroundColor: colors.primary,
        elevation: 0,
    },
    headerTitleStyle: {
        ...fonts.title,
        color: colors.light,
        fontFamily: 'montserrat-medium',
        marginHorizontal: 30,
    },
    headerTintColor: colors.light,
    headerTitleAlign: 'center',
};

export default MyRequestsNavigation;
