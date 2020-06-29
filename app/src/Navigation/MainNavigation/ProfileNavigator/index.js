import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../../pages/profile/ListProfile';
import EditProfile from '../../../pages/profile/EditProfile';
import headerStyle from '../MainStackHeaderStyle';

const ProfileStack = createStackNavigator();

const ProfileNavigation = () => (
    <ProfileStack.Navigator screenOptions={headerStyle}>
        <ProfileStack.Screen name="Perfil" component={Profile} />
        <ProfileStack.Screen
            name="EditProfile"
            component={EditProfile}
            options={() => ({
                title: 'Editar Perfil',
            })}
        />
    </ProfileStack.Navigator>
);

export default ProfileNavigation;
