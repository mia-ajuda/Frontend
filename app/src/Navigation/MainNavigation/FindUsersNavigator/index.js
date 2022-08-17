import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import findUsers from '../../../pages/FindUsersPages';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';
import socialNetworkProfilePage from '../../../pages/FindUsersPages/SocialNetworkProfile';

const Stack = createStackNavigator();

const FindUsersNavigation = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Procurar Usuários" component={findUsers} />
        <Stack.Screen
            name="Perfil social dos Usuários"
            component={socialNetworkProfilePage}
            options={{ title: 'Detalhes' }}
        />
    </Stack.Navigator>
);

export default FindUsersNavigation;
