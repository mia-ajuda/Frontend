import React from 'react';
import MyRequestDescription from '../../../pages/ActivitiesPages/MyRequestedHelp/MyRequestHelpDescription';
import MyOfferHelpDescription from '../../../pages/ActivitiesPages/MyOfferedHelp/MyOfferHelpDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import tabTopBarOptions from './tabTopBarMyOffered.options';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import History from '../../../pages/ActivitiesPages/History';
import myCampaigns from '../../../pages/ActivitiesPages/MyCampaigns';
import ListPossibleInteresteds from '../../../components/InterestedList';
import CampaignDescription from '../../../pages/HelpPages/CampaignDescription';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const NavigationGivenHelps = () => (
    <TopTab.Navigator
        initialRouteName="Atividades"
        tabBarOptions={tabTopBarOptions}
    >
        <TopTab.Screen name="Campanhas" component={myCampaigns} />
        <TopTab.Screen name="Interações" component={History} />
    </TopTab.Navigator>
);

const ActivitiesNavigator = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Atividades" component={NavigationGivenHelps} />
        <Stack.Screen
            name="MyOfferHelpDescription"
            component={MyOfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="MyRequestHelpDescription"
            component={MyRequestDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="ListHelpPossibleInteresteds"
            component={ListPossibleInteresteds}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="campaignDescription"
            options={{ title: 'Contato' }}
            component={CampaignDescription}
        />
    </Stack.Navigator>
);

export default ActivitiesNavigator;
