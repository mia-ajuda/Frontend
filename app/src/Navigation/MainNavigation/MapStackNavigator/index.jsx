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
import Profile from '../../../pages/Profile/UserProfile';
import EditNameField from '../../../pages/Profile/EditProfileFields/NameField';
import EditCepField from '../../../pages/Profile/EditProfileFields/CEPField';
import EditPhoneField from '../../../pages/Profile/EditProfileFields/PhoneFIeld';
import SocialNetworkProfilePage from '../../../pages/FindUsersPages/SocialNetworkProfile';
import FollowersFollowingPage from '../../../pages/FindUsersPages/Followers_Following';
import FindUsers from '../../../pages/FindUsersPages';

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
            name="listHelpInteresteds"
            component={ListPossibleInteresteds}
            options={{ title: 'Detalhes' }}
        />

        <Stack.Screen
            name="profile"
            component={Profile}
            options={({ navigation }) => ({
                ...showCustomHeader('Perfil', navigation),
            })}
        />
        <Stack.Screen
            name="editNameField"
            component={EditNameField}
            options={{
                title: 'Editar Nome',
            }}
        />
        <Stack.Screen
            name="editCEPField"
            component={EditCepField}
            options={{
                title: 'Editar CEP',
            }}
        />
        <Stack.Screen
            name="editPhoneField"
            component={EditPhoneField}
            options={{
                title: 'Editar Telefone',
            }}
        />
        <Stack.Screen
            name="socialUserProfile"
            component={SocialNetworkProfilePage}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="followersFollowingPage"
            component={FollowersFollowingPage}
            options={{ title: 'Usuários' }}
        />

        <Stack.Screen
            name="searchUsers"
            component={FindUsers}
            options={({ navigation }) => ({
                ...showCustomHeader('Procurar Usuários', navigation),
            })}
        />
    </Stack.Navigator>
);

export default MainNavigation;
