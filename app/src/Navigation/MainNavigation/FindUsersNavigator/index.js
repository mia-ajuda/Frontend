import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import findUsers from '../../../pages/FindUsersPages';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';

const Stack = createStackNavigator();

const FindUsersNavigation = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Procurar Usuários" component={findUsers} />
    </Stack.Navigator>
);

export default FindUsersNavigation;
