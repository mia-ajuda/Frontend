import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../../pages/profile/ListProfile';
import EditProfile from '../../../pages/profile/EditProfile';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';

const Stack = createStackNavigator();

const ProfileNavigation = () => (
    <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Perfil" component={Profile} />
        <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={() => ({
                title: 'Editar Perfil',
            })}
        />
    </Stack.Navigator>
);

export default ProfileNavigation;
