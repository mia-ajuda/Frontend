import React from 'react';
import OnGoingHelps from '../../../pages/HelpPages/HelpsOffered/OnGoingHelps';
import HelpsFinished from '../../../pages/HelpPages/HelpsOffered/HelpsFinished';
import OfferHelpDescription from '../../../pages/HelpPages/OfferHelpDescription';
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
        <TopTab.Screen name="em andamento" component={OnGoingHelps} />
        <TopTab.Screen name="finalizadas" component={HelpsFinished} />
    </TopTab.Navigator>
);

const HelpTopBar = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Minhas Ofertas" component={NavigationGivenHelps} />
        <Stack.Screen
            name="OfferDescription"
            component={OfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
    </Stack.Navigator>
);

export default HelpTopBar;
