import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../../pages/Main';
import CreateHelpRequest from '../../../pages/HelpPages/CreateHelpRequest';
import CreateHelpOffer from '../../../pages/HelpPages/CreateHelpOffer';
import CreateCampaign from '../../../pages/HelpPages/CreateCampaign';
import MapHelpDescription from '../../../pages/HelpPages/MapHelpDescription';
import CampaignDescription from '../../../pages/HelpPages/CampaignDescription';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import Location from '../../../pages/AuthPages/Location';
import Photo from '../../../pages/AuthPages/Photo';
import PhotoPreview from '../../../pages/AuthPages/Photo/PhotoPreview';
import Address from '../../../pages/AuthPages/Address';

const Stack = createStackNavigator();

const MainNavigation = () => (
    <Stack.Navigator initialRouteName="home" screenOptions={headerStyle}>
        <Stack.Screen
            name="home"
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
            name="campaignDescription"
            options={{ title: 'Contato' }}
            component={CampaignDescription}
        />
        <Stack.Screen
            name="location"
            options={{ title: 'Localização' }}
            component={Location}
        />
        <Stack.Screen
            name="address"
            options={{ title: 'Endereço' }}
            component={Address}
        />
        <Stack.Screen
            name="photo"
            options={{ title: 'Foto' }}
            component={Photo}
        />
        <Stack.Screen name="photoPreview" component={PhotoPreview} />
    </Stack.Navigator>
);

export default MainNavigation;
