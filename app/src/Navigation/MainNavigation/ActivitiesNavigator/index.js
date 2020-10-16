import React from 'react';
import MyRequestDescription from '../../../pages/HelpPages/MyRequestHelpDescrition';
import MyOfferHelpDescription from '../../../pages/HelpPages/MyOfferHelpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import tabTopBarOptions from './tabTopBarMyOffered.options';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import History from '../../../pages/ActivitiesPages/History';
import myOfferedHelp from '../../../pages/ActivitiesPages/MyOfferedHelp';
import myRequestedHelp from '../../../pages/ActivitiesPages/MyRequestedHelp';
import ListPossibleHelpers from '../../../pages/HelpPages/MyRequestHelpDescrition/ListPossibleHelpers';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const NavigationGivenHelps = () => (
    <TopTab.Navigator
        initialRouteName="Atividades"
        tabBarOptions={tabTopBarOptions}>
        {/* Minhas ofertas de ajuda, diferente de interação com outros usuários */}
        <TopTab.Screen name="Minhas ofertas" component={myOfferedHelp} />
        {/* Meus pedidos de ajuda */}
        <TopTab.Screen name="Meus pedidos" component={myRequestedHelp} />
        {/* Interação com outros usuários */}
        <TopTab.Screen name="Interações" component={History} />
    </TopTab.Navigator>
);

const ActivitiesNavigator = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Atividades" component={NavigationGivenHelps} />
        <Stack.Screen
            name="OfferDescription"
            component={MyOfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="MyRequestHelpDescrition"
            component={MyRequestDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="listPossibleHelpers"
            component={ListPossibleHelpers}
            options={{ title: 'Detalhes' }}
        />
    </Stack.Navigator>
);

export default ActivitiesNavigator;
