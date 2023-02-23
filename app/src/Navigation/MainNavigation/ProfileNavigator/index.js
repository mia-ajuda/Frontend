import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../../pages/Profile/UserProfile';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import EditNameField from '../../../pages/Profile/EditProfileFields/NameField';
import EditCEPField from '../../../pages/Profile/EditProfileFields/CEPField';
import EditPhoneField from '../../../pages/Profile/EditProfileFields/PhoneFIeld';

import SocialNetworkProfilePage from '../../../pages/FindUsersPages/SocialNetworkProfile';
import MapHelpDescription from '../../../pages/HelpPages/MapHelpDescription';
import OfferHelpDescription from '../../../pages/ActivitiesPages/MyOfferedHelp/MyOfferHelpDescription';
import FollowersFollowingPage from '../../../pages/FindUsersPages/Followers_Following';
import { showDrawerButtonInStackOption } from '../../DrawerNavigation/options';

const Stack = createStackNavigator();

const ProfileNavigation = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen
            name="Perfil"
            component={Profile}
            options={showDrawerButtonInStackOption}
        />
        <Stack.Screen
            name="EditNameField"
            component={EditNameField}
            options={{
                title: 'Editar Nome',
            }}
        />
        <Stack.Screen
            name="EditCEPField"
            component={EditCEPField}
            options={{
                title: 'Editar CEP',
            }}
        />
        <Stack.Screen
            name="EditPhoneField"
            component={EditPhoneField}
            options={{
                title: 'Editar Telefone',
            }}
        />

        <Stack.Screen
            name="Perfil social dos Usuários"
            component={SocialNetworkProfilePage}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="OfferHelpDescription"
            component={OfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="mapHelpDescription"
            component={MapHelpDescription}
            options={{ title: 'Detalhes' }}
        />

        <Stack.Screen
            name="FollowersFollowingPage"
            component={FollowersFollowingPage}
            options={{ title: 'Usuários' }}
        />
    </Stack.Navigator>
);

export default ProfileNavigation;
