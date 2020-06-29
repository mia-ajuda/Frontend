import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnGoingHelps from '../../../pages/helpPages/MyRequests/onGoing';
import DoneHelps from '../../../pages/helpPages/MyRequests/doneHelps';
import HelpDescription from '../../../pages/helpPages/helpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import tabTopBarOptions from './tabTopBarMyHelp';

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

export default MyRequestsNavigation;
