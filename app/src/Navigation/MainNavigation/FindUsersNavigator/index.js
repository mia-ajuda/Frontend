import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FindUsers from '../../../pages/FindUsersPages';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import SocialNetworkProfilePage from '../../../pages/FindUsersPages/SocialNetworkProfile';
import MyRequestDescription from '../../../pages/ActivitiesPages/MyRequestedHelp/MyRequestHelpDescription';
import MyOfferHelpDescription from '../../../pages/ActivitiesPages/MyOfferedHelp/MyOfferHelpDescription';
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
            name="MyOfferHelpDescription"
            component={MyOfferHelpDescription}
            options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
            name="MyRequestHelpDescription"
            component={MyRequestDescription}
            options={{ title: 'Detalhes' }}
        />
    </Stack.Navigator>
);

export default FindUsersNavigation;
