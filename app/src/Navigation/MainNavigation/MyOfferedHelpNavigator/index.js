import React from 'react';
import on_goingGivenHelp from '../../../pages/helpPages/givenHelps/on_going';
import finishedGivenHelp from '../../../pages/helpPages/givenHelps/finished';
import HelpDescription from '../../../pages/helpPages/helpDescription';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';
import headerStyle from '../MainStackHeaderStyle';
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
