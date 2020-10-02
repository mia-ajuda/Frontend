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
        initialRouteName="Minhas ofertas"
        tabBarOptions={tabTopBarOptions}>
        <TopTab.Screen name="Minhas ofertas" component={myOfferedHelp} />
        <TopTab.Screen name="Meus pedidos" component={myRequestedHelp} />
        <TopTab.Screen name="historico" component={history} />
    </TopTab.Navigator>
);

const HistoryNavigator = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Histórico" component={NavigationGivenHelps} />
        <Stack.Screen
            name="OfferDescription"
            component={MyOfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
    </Stack.Navigator>
);

export default HistoryNavigator;
