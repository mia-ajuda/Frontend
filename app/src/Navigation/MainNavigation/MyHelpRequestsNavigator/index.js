import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnGoingHelps from '../../../pages/helpPages/MyRequests/onGoing';
import DoneHelps from '../../../pages/helpPages/MyRequests/doneHelps';
import HelpDescription from '../../../pages/helpPages/helpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import tabTopBarOptions from './tabTopBarMyHelp.options';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const navigationAskedHelps = () => (
    <TopTab.Navigator
        initialRouteName="em andamento"
        tabBarOptions={tabTopBarOptions}>
        <TopTab.Screen name="em andamento" component={OnGoingHelps} />
        <TopTab.Screen name="finalizados" component={DoneHelps} />
    </TopTab.Navigator>
);

const MyRequestsNavigation = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Meus pedidos" component={navigationAskedHelps} />
        <Stack.Screen
            name="RequestDescription"
            component={HelpDescription}
            options={({ route }) => ({
                title: route.params.helpTitle,
            })}
        />
    </Stack.Navigator>
);

export default MyRequestsNavigation;
