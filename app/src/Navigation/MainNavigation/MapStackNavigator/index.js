import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../../pages/Main';
import CreateHelpRequest from '../../../pages/HelpPages/CreateHelpRequest';
import CreateHelpOffer from '../../../pages/HelpPages/CreateHelpOffer';
import CreateCampaign from '../../../pages/HelpPages/CreateCampaign';
import MapHelpDescription from '../../../pages/HelpPages/MapHelpDescription';
import MapCampaignDescription from '../../../pages/HelpPages/MapCampaignDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';

const Stack = createStackNavigator();

const MainNavigation = () => (
    <Stack.Navigator initialRouteName="main" screenOptions={headerStyle}>
        <Stack.Screen
            name="main"
            component={Main}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="createHelpRequest"
            options={{ title: 'Pedir ajuda' }}
            component={CreateHelpRequest}
        />
        <Stack.Screen
            name="createHelpOffer"
            options={{
                title: 'Oferecer ajuda',
            }}
            component={CreateHelpOffer}
        />
        <Stack.Screen
            name="createCampaign"
            options={{ title: 'Campanha' }}
            component={CreateCampaign}
        />
        <Stack.Screen
            name="mapHelpDescription"
            options={{ title: 'Detalhes' }}
            component={MapHelpDescription}
        />
        <Stack.Screen
            name="mapCampaignDescription"
            options={{ title: 'Contato' }}
            component={MapCampaignDescription}
        />
    </Stack.Navigator>
);

export default MainNavigation;
