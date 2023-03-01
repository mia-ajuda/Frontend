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
import Address from '../../../pages/AuthPages/Address';
import { showCustomHeader } from '../../../utils/showCustomHeader';
import { NavigationGivenHelps } from '../GivenHelps';
import MyOfferHelpDescription from '../../../pages/ActivitiesPages/MyOfferedHelp/MyOfferHelpDescription';
import ListPossibleInteresteds from '../../../components/InterestedList';
import NotificationPage from '../../../pages/Notification/index';
import { MyRequestHelpDescription } from '../MyRequestHelpDescription';

const Stack = createStackNavigator();

const MainNavigation = ({ initialRouteName }) => (
    <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={headerStyle}
    >
        <Stack.Screen
            name="home"
            component={Main}
            options={({ navigation }) => ({
                ...showCustomHeader('Mapa', navigation),
                title: 'Mapa',
            })}
        />

        <Stack.Screen
            name="notifications"
            component={NotificationPage}
            options={({ navigation }) => ({
                title: 'Notificações',
                ...showCustomHeader('Notificações', navigation),
            })}
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
            options={{ headerShown: false }}
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
        <Stack.Screen
            name="activities"
            component={NavigationGivenHelps}
            options={({ navigation }) => ({
                ...showCustomHeader('Atividades', navigation),
            })}
        />
        <Stack.Screen
            name="myOfferHelpDescription"
            component={MyOfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="myRequestHelpDescription"
            component={MyRequestHelpDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="ListHelpInteresteds"
            component={ListPossibleInteresteds}
            options={{ title: 'Detalhes' }}
        />
    </Stack.Navigator>
);

export default MainNavigation;
