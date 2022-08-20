import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FindUsers from '../../../pages/FindUsersPages';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import SocialNetworkProfilePage from '../../../pages/FindUsersPages/SocialNetworkProfile';
import MapHelpDescription from '../../../pages/HelpPages/MapHelpDescription';
import OfferHelpDescription from '../../../pages/ActivitiesPages/MyOfferedHelp/MyOfferHelpDescription';
import FollowersFollowingPage from '../../../pages/FindUsersPages/Followers_Following';
const Stack = createStackNavigator();

const FindUsersNavigation = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Procurar Usuários" component={FindUsers} />
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

export default FindUsersNavigation;
