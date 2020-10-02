import React from 'react';
import MyOfferHelpDescription from '../../../pages/HelpPages/MyOfferHelpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import tabTopBarOptions from './tabTopBarMyOffered.options';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import history from '../../../pages/HistoryPages/History';
import myOfferedHelp from '../../../pages/HistoryPages/MyOfferedHelp';
import myRequestedHelp from '../../../pages/HistoryPages/MyRequestedHelp';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const NavigationGivenHelps = () => (
    <TopTab.Navigator
        initialRouteName="em andamento"
        tabBarOptions={tabTopBarOptions}>
        <TopTab.Screen name="em andamento" component={myOfferedHelp} />
        <TopTab.Screen name="finalizadas" component={myRequestedHelp} />
        <TopTab.Screen name="historico" component={history} />
    </TopTab.Navigator>
);

const HistoryNavigator = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Minhas Ofertas" component={NavigationGivenHelps} />
        <Stack.Screen
            name="OfferDescription"
            component={MyOfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
    </Stack.Navigator>
);

export default HistoryNavigator;
