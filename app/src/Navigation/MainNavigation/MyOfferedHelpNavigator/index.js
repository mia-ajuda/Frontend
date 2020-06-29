import React from 'react';
import on_goingGivenHelp from '../../../pages/helpPages/givenHelps/on_going';
import finishedGivenHelp from '../../../pages/helpPages/givenHelps/finished';
import HelpDescription from '../../../pages/helpPages/helpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import tabTopBarOptions from './tabTopBarMyHelp';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const HelpTopBarNavigation = createMaterialTopTabNavigator();
const OfferedHelpStack = createStackNavigator();

const navigationGivenHelps = () => (
    <HelpTopBarNavigation.Navigator
        initialRouteName="em andamento"
        tabBarOptions={tabTopBarOptions}>
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

const HelpTopBar = () => (
    <OfferedHelpStack.Navigator screenOptions={headerStyle}>
        <OfferedHelpStack.Screen
            name="Minhas Ofertas"
            component={navigationGivenHelps}
        />
        <OfferedHelpStack.Screen
            name="OfferDescription"
            component={HelpDescription}
            options={({ route }) => ({
                title: route.params.helpTitle,
            })}
        />
    </OfferedHelpStack.Navigator>
);

export default HelpTopBar;
