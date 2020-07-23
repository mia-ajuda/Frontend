import React from 'react';
import on_goingGivenHelp from '../../../pages/helpPages/givenHelps/on_going';
import finishedGivenHelp from '../../../pages/helpPages/givenHelps/finished';
import HelpDescription from '../../../pages/helpPages/helpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import tabTopBarOptions from './tabTopBarMyOffered.options';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const NavigationGivenHelps = () => (
    <TopTab.Navigator
        initialRouteName="em andamento"
        tabBarOptions={tabTopBarOptions}>
        <TopTab.Screen name="em andamento" component={on_goingGivenHelp} />
        <TopTab.Screen name="finalizadas" component={finishedGivenHelp} />
    </TopTab.Navigator>
);

const HelpTopBar = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Minhas Ofertas" component={NavigationGivenHelps} />
        <Stack.Screen
            name="OfferDescription"
            component={HelpDescription}
            options={({ route }) => ({
                title: route.params.help.title,
            })}
        />
    </Stack.Navigator>
);

export default HelpTopBar;
